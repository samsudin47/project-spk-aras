import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import SPKChart from "./SPKChart";

export default function TabelDataHasilKeputusan() {
  const [penilaianAlternatif, setPenilaianAlternatif] = useState([]);
  const [alternatives, setAlternatives] = useState([]);
  const [criteria, setCriteria] = useState([]);
  const [userName, setUsername] = useState("");
  const [rankedValues, setRankedValues] = useState([]);

  useEffect(() => {
    const userName = localStorage.getItem("username");
    if (userName) {
      setUsername(userName);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const responseAlternatif = await axios.get(
          "http://localhost:9000/api/cms/alternatifScore"
        );
        setPenilaianAlternatif(responseAlternatif.data);

        const responseAlternatives = await axios.get(
          "http://localhost:9000/api/cms/alternatives"
        );
        setAlternatives(responseAlternatives.data);

        const responseCriteria = await axios.get(
          "http://localhost:9000/api/cms/criteria"
        );
        setCriteria(responseCriteria.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (penilaianAlternatif.length && alternatives.length && criteria.length) {
      // Hitung nilai normalisasi untuk setiap kriteria
      const normalizedValues = criteria.map((crit) => {
        const total = penilaianAlternatif
          .filter((item) => item.kriteriaId === crit.id)
          .reduce((sum, item) => sum + item.nilai, 0);

        return {
          kriteriaId: crit.id,
          total,
        };
      });

      // Hitung nilai utility terbobot dan total utility untuk setiap alternatif
      const calculatedPreferences = alternatives.map((alternative) => {
        let totalUtility = 0;
        const utilityValues = criteria.map((crit) => {
          const nilai = penilaianAlternatif.find(
            (item) =>
              item.alternativeId === alternative.id &&
              item.kriteriaId === crit.id
          )?.nilai;

          const total = normalizedValues.find(
            (norm) => norm.kriteriaId === crit.id
          )?.total;

          // Normalisasi nilai (rij)
          const normalizedValue = nilai ? nilai / total : 0;

          // Hitung nilai utility terbobot (zij)
          const weightedValue = normalizedValue * (crit.bobot / 10);

          // Akumulasi total utility (Si)
          totalUtility += weightedValue;

          return {
            kriteriaId: crit.id,
            normalizedValue,
            weightedValue,
          };
        });

        return {
          alternative: alternative.name,
          kode: alternative.kode,
          utilityValues,
          totalUtility,
        };
      });

      // Cari S_max untuk menghitung rasio (Ki)
      const maxUtility = Math.max(
        ...calculatedPreferences.map((item) => item.totalUtility)
      );

      // Hitung rasio (Ki) untuk setiap alternatif
      const finalPreferences = calculatedPreferences.map((item) => {
        const ratio = item.totalUtility / maxUtility;
        return {
          ...item,
          ratio,
        };
      });

      // Melakukan perangkingan berdasarkan nilai rasio (Ki) secara menurun
      const ranked = finalPreferences.sort((a, b) => b.ratio - a.ratio);
      setRankedValues(ranked);
    }
  }, [penilaianAlternatif, alternatives, criteria]);

  const tableRef = useRef();

  const generatePDF = async () => {
    const element = tableRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save("data-hasil-keputusan.pdf");
  };

  const pieChartData = rankedValues.map((item, index) => {
    const totalPreferensi = rankedValues.reduce(
      (sum, val) => sum + val.totalUtility,
      0
    );
    const percentage = ((item.totalUtility / totalPreferensi) * 100).toFixed(2);

    return {
      id: index,
      value: item.totalUtility,
      label: `${item.alternative} (${percentage}%)`,
    };
  });

  return (
    <div className="container mt-5">
      <h4 className="text-start fw-bold">Hasil Akhir</h4>
      <div className="me-5 mt-3">
        <div className="text-end mb-3">
          <Button className="btn btn-primary" onClick={generatePDF}>
            <ion-icon name="print-outline" size="small"></ion-icon> Cetak PDF
          </Button>
        </div>
        <div ref={tableRef}>
          <h1 className="text-start text-primary fw-bold">PT Maha Karya</h1>
          <h5 className="mb-3 text-decoration-underline">
            Data hasil perhitungan produk
          </h5>
          <table className="table table-striped text-start w-50">
            <tbody>
              <tr>
                <td className="w-25 bg-primary text-white fw-semibold lead">
                  Nama :
                </td>
                <td className="bg-primary text-white text-start fw-semibold lead">
                  {userName}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Kode</th>
                <th>Alternatif</th>
                <th>Skor</th>
                <th>
                  Rasio (K<sub>i</sub>)
                </th>
                <th>Rangking</th>
              </tr>
            </thead>
            <tbody>
              {rankedValues.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.kode}</td>
                  <td>{item.alternative}</td>
                  <td>{item.totalUtility.toFixed(3)}</td>
                  <td>{item.ratio.toFixed(3)}</td>
                  <td>{index + 1}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <SPKChart data={pieChartData} />
        </div>
      </div>
    </div>
  );
}
