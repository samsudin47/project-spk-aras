import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Registrasi from "./components/Registrasi";
import PageLayout from "./layouts/PageLayout";
import DataAlternatif from "./layouts/DataAlternatif";
import DataKriteria from "./layouts/DataKriteria";
import PenilaianAlternatif from "./layouts/PenilaianAlternatif";
import ProsesHitung from "./layouts/ProsesHitung";
import DataHasilKeputusan from "./layouts/DataHasilKeputusan";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout />} />
          <Route path="/register" element={<Registrasi />} />
          <Route path="/login" element={<Login />} />
          <Route path="/alternatif" element={<DataAlternatif />} />
          <Route path="/kriteria" element={<DataKriteria />} />
          <Route
            path="/penilaianAlternatif"
            element={<PenilaianAlternatif />}
          />
          <Route path="/proseshitung" element={<ProsesHitung />} />
          <Route path="/hasilkeputusan" element={<DataHasilKeputusan />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
