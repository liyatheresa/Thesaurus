import React, { useState } from "react";
import Overlay from "./Components/Overlay";
import SearchBar from "./Components/SearchBar";

import "./App.css";
function App() {
  const [search, setSearch] = useState(false);
  return (
    <>
      <SearchBar search={search} setSearch={setSearch} />
      {search && <Overlay />}
    </>
  );
}

export default App;
