/* eslint-disable react/prop-types */
export default function HitungNilaiPreferensi({
  penilaianAlternatif,
  alternatives,
  criteria,
}) {
  // Hitung nilai normalisasi untuk setiap alternatif dan kriteria
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

  return (
    <div className="my-5">
      <h4 className="text-start mb-4">3. Hitung Nilai Utility Terbobot</h4>
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
              <th scope="col">
                Total Utility (S<sub>i</sub>)
              </th>
              <th scope="col">
                Rasio (K<sub>i</sub>)
              </th>
            </tr>
          </thead>
          <tbody>
            {finalPreferences.map((item, index) => (
              <tr key={index}>
                <td scope="row">{index + 1}</td>
                <td>{item.alternative}</td>
                {item.utilityValues.map((val, idx) => (
                  <td key={idx}>{val.weightedValue.toFixed(3)}</td>
                ))}
                <td>{item.totalUtility.toFixed(3)}</td>
                <td>{item.ratio.toFixed(3)}</td>
              </tr>
            ))}
            <tr>
              <th scope="row" colSpan={2}>
                Bobot Kriteria
              </th>
              {criteria.map((crit) => (
                <td key={crit.id}>{(crit.bobot / 10).toFixed(2)}</td>
              ))}
              <td colSpan={2}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
