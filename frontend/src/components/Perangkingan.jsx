/* eslint-disable react/prop-types */
export default function Perangkingan({
  penilaianAlternatif,
  alternatives,
  criteria,
}) {
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
          item.alternativeId === alternative.id && item.kriteriaId === crit.id
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
  const rankedValues = finalPreferences.sort((a, b) => b.ratio - a.ratio);

  return (
    <div className="my-5">
      <h4 className="text-start mb-4">4. Menentukan Peringkat</h4>
      <div className="me-5">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Alternatif</th>
              <th scope="col">
                Total Utility (S<sub>i</sub>)
              </th>
              <th scope="col">
                Rasio (K<sub>i</sub>)
              </th>
              <th scope="col">Rangking</th>
            </tr>
          </thead>
          <tbody>
            {rankedValues.map((item, index) => (
              <tr key={index}>
                <td scope="row">{index + 1}</td>
                <td>{item.alternative}</td>
                <td>{item.totalUtility.toFixed(3)}</td>
                <td>{item.ratio.toFixed(3)}</td>
                <td>{index + 1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
