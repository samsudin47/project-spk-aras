import Normalisasi from "./Normalisasi";
// import HasilNormalisasi from "./HasilNormalisasi";
import HitungNilaiPreferensi from "./HitungNilaiPreferensi";
// import HasilPreferensi from "./HasilPreferensi";
// import HitungTotalNilaiPreferensi from "./HitungTotalNilaiPreferensi";
import Perangkingan from "./Perangkingan";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

export default function TableProsesHitung() {
  const [penilaianAlternatif, setPenilaianAlternatif] = useState([]);
  const [alternatives, setAlternatives] = useState([]);
  const [criteria, setCriteria] = useState([]);

  // ambil data penilaianAlternatif dari backend
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/api/cms/alternatifScore"
        );
        setPenilaianAlternatif(response.data);
      } catch (error) {
        console.error("Error fetching penilaianAlternatif data:", error);
      }
    };

    loadData();
  }, []);

  // Ambil data alternatives dan criteria
  useEffect(() => {
    const loadAlternatives = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/api/cms/alternatives"
        );
        setAlternatives(response.data);
      } catch (error) {
        console.error("Error fetching alternatives:", error);
      }
    };

    const loadCriteria = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/api/cms/criteria"
        );
        setCriteria(response.data);
      } catch (error) {
        console.error("Error fetching criteria:", error);
      }
    };

    loadAlternatives();
    loadCriteria();
  }, []);

  // const handleNormalizedValues = (normalized) => {
  //   setNormalizedValues(normalized);
  // };

  return (
    <>
      <div className="container mt-5">
        <h4 className="text-start mb-4">1. Matriks Keputusan</h4>
        <div className="me-5">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Alternatif</th>
                {criteria.map((crit) => (
                  <th key={crit.id} scope="col">
                    {crit.kriteriaId}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {alternatives.map((alternative, index) => {
                // Ambil data penilaianAlternatif untuk setiap produk dan kriteria
                const penilaian = penilaianAlternatif.filter(
                  (item) => item.alternativeId === alternative.id
                );

                return (
                  <tr key={alternative.id}>
                    <td scope="row">{index + 1}</td>
                    <td>{alternative.kode}</td>
                    {criteria.map((crit) => {
                      // Temukan nilai untuk kriteria tertentu
                      const nilai = penilaian.find(
                        (item) => item.kriteriaId === crit.id
                      )?.nilai;
                      return <td key={crit.id}>{nilai || "-"}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Normalisasi
            penilaianAlternatif={penilaianAlternatif}
            alternatives={alternatives}
            criteria={criteria}
          />
          <HitungNilaiPreferensi
            penilaianAlternatif={penilaianAlternatif}
            alternatives={alternatives}
            criteria={criteria}
          />
          <Perangkingan
            penilaianAlternatif={penilaianAlternatif}
            alternatives={alternatives}
            criteria={criteria}
          />
        </div>
      </div>
    </>
  );
}
