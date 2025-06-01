import { useState, useEffect } from "react";

const mockData = [
  {
    project: "GSTP-1",
    subgroup: "Scale Up of RAP-9924",
    compound: "Compound in Progress",
    smiles: `O=C1N2[C@H](C(=O)N[C@H](CCC3=CC(OC)=C(OC)C=C3)C3=CC(=CC=C3)OCCNC(=O)CN(CC3=C(OC)C=C(OC)C=C3OC)C(=O)C3(C4=CC=C(NC(=O)[C@H](CCCC)NC(=O)[C@H]5N(C(=O)CCC6=CN(CC(C)(C)C1=O)N=N6)CC5)C=C4)CCC3)CCCC2`,
    estimatedSubmission: "2025-06-05",
    stepsCompleted: 3,
    totalSteps: 9,
  },
  {
    project: "GSTP-1",
    subgroup: "Scale Up of RAP-9951",
    compound: "Compound in Progress",
    smiles: 'O=C1N2[C@H](C(=O)N[C@H](CCC3=CC(OC)=C(OC)C=C3)C3=CC(=CC=C3)OCCNC(=O)CN(CC3=CC=C(OC)C=C3OC)C(=O)C3(C4=CC=C(NC(=O)[C@H](CCCC)NC(=O)[C@H]5N(C(=O)CCC6=CN(CC(C)(C)C1=O)N=N6)CC5)C=C4)CCC3)CCCC2',
    estimatedSubmission: "2025-06-05",
    stepsCompleted: 3,
    totalSteps: 9,
  },
  {
    project: "GSTP-1",
    subgroup: "Scale Up of RAP-9962",
    compound: "Compound in Progress",
    smiles: "O=C1N2[C@H](C(=O)N[C@H](CCC3=CC(OC)=C(OC)C=C3)C3=CC(=CC=C3)OCCNC(=O)CN(CC3=CC=C(C(F)(F)F)C=C3)C(=O)C3(C4=CC=C(NC(=O)[C@H](CCCC)NC(=O)[C@H]5N(C(=O)CCC6=CN(CC(C)(C)C1=O)N=N6)CC5)C=C4)CCC3)CCCC2",
    estimatedSubmission: "2025-06-05",
    stepsCompleted: 3,
    totalSteps: 9,
  },
];

export default function App() {
  const [data] = useState(() => [...mockData]);
  const [filter, setFilter] = useState("All");

  const projects = [...new Set(data.map((d) => d.project))];
  const filteredData = filter === "All" ? data : data.filter((d) => d.project === filter);

  const getStructureURL = (smiles) =>
    `https://cactus.nci.nih.gov/chemical/structure/${encodeURIComponent(smiles)}/image`;

  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-[#B8E0DA] via-[#E6F4F1] to-white text-[#1F365C] font-sans antialiased pl-8 pr-4 pt-4 pb-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold tracking-wide text-[#1F365C] mb-4">SBW Chemistry Dashboard</h1>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("All")}
          className="bg-[#167D7F] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#0F5B5D] transition-colors duration-200"
        >
          All
        </button>
        {projects.map((proj) => (
          <button
            key={proj}
            onClick={() => setFilter(proj)}
            className="bg-white border border-[#167D7F] text-[#167D7F] px-5 py-2 rounded-lg shadow-md hover:bg-[#D9F0F0] transition-colors duration-200"
          >
            {proj}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((entry, idx) => (
          <div
            key={idx}
            className="rounded-xl shadow-md p-6 bg-[#F0FAF9] border border-[#A3D9D8] transition-all hover:shadow-lg hover:border-[#167D7F]"
          >
            <h2 className="text-xl font-bold text-[#153053] mb-2">{entry.compound}</h2>
            <p className="text-sm text-[#4A6A78] mb-3">
              {entry.project} — {entry.subgroup}
            </p>
            <img
              src={getStructureURL(entry.smiles)}
              alt="Structure"
              className="mt-2 mb-4 w-full h-40 object-contain rounded border border-gray-200"
            />
            <div className="w-full bg-[#D8E9E6] rounded-full h-2.5 mb-2">
              <div
                className="bg-[#1F365C] h-2.5 rounded-full transition-all duration-300"
                style={{
                  width: `${(entry.stepsCompleted / entry.totalSteps) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-sm text-[#2C3E50] font-medium text-right">
              {entry.stepsCompleted} / {entry.totalSteps} steps complete
            </p>
            <p className="text-xs text-[#6D8A8E] text-right italic mt-1">
              Estimated Submission: {entry.estimatedSubmission}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}