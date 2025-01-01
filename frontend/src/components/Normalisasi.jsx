/* eslint-disable react/prop-types */
export default function Normalisasi({
  penilaianAlternatif,
  alternatives,
  criteria,
}) {
  // Fungsi untuk menghitung total nilai pada setiap kriteria
  const getTotalForCriterion = (kriteriaId) => {
    return penilaianAlternatif
      .filter((item) => item.kriteriaId === kriteriaId)
      .reduce((total, item) => total + item.nilai, 0);
  };

  // Hitung total untuk setiap kriteria
  const totalCriteria = {};
  criteria.forEach((crit) => {
    totalCriteria[crit.id] = getTotalForCriterion(crit.id);
  });

  return (
    <div className="my-5">
      <h4 className="text-start mb-4">2. Normalisasi Matriks</h4>
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
              // Ambil data penilaianAlternatif untuk setiap alternatif dan kriteria
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
                    const total = totalCriteria[crit.id];
                    // Hitung nilai normalisasi
                    const nilaiNormalisasi = total
                      ? (nilai / total).toFixed(2)
                      : "-";
                    return <td key={crit.id}>{nilaiNormalisasi}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
