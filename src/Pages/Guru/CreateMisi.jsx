import React, { useState } from "react";
import dataIcon from "/src/assets/Data/icon.jsx";
import { useNavigate } from "react-router-dom";

export default function BuatMisi() {
  const navigate = useNavigate();
  const [judulMisi, setJudulMisi] = useState("");
  const [petunjuk, setPetunjuk] = useState("");
  const [target, setTarget] = useState(1);
  const [lampiran, setLampiran] = useState([]);
  const [showAddLink, setShowAddLink] = useState(false);
  const [newLinkName, setNewLinkName] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");

  const handleTargetPrev = () => {
    if (target > 1) setTarget((t) => t - 1);
  };

  const handleTargetNext = () => {
    setTarget((t) => t + 1);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLampiran([...lampiran, { type: "file", name: file.name, subtitle: "File" }]);
    }
    e.target.value = "";
  };

  const handleAddLink = () => {
    if (newLinkName.trim() && newLinkUrl.trim()) {
      setLampiran([...lampiran, { type: "link", name: newLinkName.trim(), subtitle: newLinkUrl.trim() }]);
      setNewLinkName("");
      setNewLinkUrl("");
      setShowAddLink(false);
    }
  };

  const handleRemoveLampiran = (index) => {
    setLampiran(lampiran.filter((_, i) => i !== index));
  };

  return (
    <div className="flex h-screen bg-[#F3F0EC]">

      {/* SIDEBAR */}
      <div className="w-[80px] bg-[#E7E3DE] flex flex-col items-center py-4 gap-6">

        {/* Menu Icon */}
        <div>
          {dataIcon({ size: 26, color: "#4CAF50" }).menu}
        </div>

        {/* Active - Graduation Cap */}
        <div className="bg-[#CFE8D5] p-3 rounded-xl">
          {dataIcon({ size: 24, color: "#2E7D32" }).graduationCap}
        </div>

        {/* Logout */}
        <div>
          {dataIcon({ size: 24, color: "#9E9E9E" }).logout}
        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 px-10 py-6 overflow-y-auto">

        {/* LOGO */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src="/src/assets/eduko-removebg-preview.png"
            alt="Educo"
            className="h-8"
          />
        </div>

        {/* KEMBALI BUTTON */}
        <button onClick={handleBack} className="flex items-center gap-2 bg-[#4CAF50] text-white px-5 py-2 rounded-full mb-8 text-sm font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Kembali
        </button>

        {/* FORM ROW */}
        <div className="flex gap-5 items-start">

          {/* ===== LEFT CARD ===== */}
          <div className="flex-1 bg-[#F4A900] rounded-2xl p-5 flex flex-col gap-4 min-h-[300px]">

            {/* Judul Misi Input */}
            <input
              type="text"
              placeholder="Masukkan Judul Misi"
              value={judulMisi}
              onChange={(e) => setJudulMisi(e.target.value)}
              className="w-full bg-transparent text-white placeholder-white text-[15px] font-medium outline-none border-none"
            />

            {/* Divider line */}
            <div className="h-px bg-white/30" />

            {/* Petunjuk Textarea Block */}
            <div className="flex flex-col gap-3">

              {/* Textarea */}
              <textarea
                placeholder="Masukan petunjuk pengerjaan"
                value={petunjuk}
                onChange={(e) => setPetunjuk(e.target.value)}
                rows={4}
                className="w-full bg-transparent text-white placeholder-white text-[15px] font-medium outline-none border-none resize-none"
              />

              {/* Attachment Cards (shown when there are attachments) */}
              {lampiran.map((item, i) => (
                <div
                  key={i}
                  className="bg-[#8B8C1A] rounded-xl px-4 py-3 flex items-center justify-between gap-3"
                >
                  <div className="flex-1">
                    <p className="text-white text-[14px] font-semibold underline cursor-pointer leading-tight">
                      {item.name}
                    </p>
                    <p className="text-white/70 text-[12px] leading-tight mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveLampiran(i)}
                    className="text-white hover:text-red-300 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}

              {/* Add Link Form */}
              {showAddLink && (
                <div className="bg-[#8B8C1A] rounded-xl px-4 py-3 flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Nama Link"
                    value={newLinkName}
                    onChange={(e) => setNewLinkName(e.target.value)}
                    className="bg-transparent text-white placeholder-white/70 text-[13px] outline-none"
                  />
                  <input
                    type="url"
                    placeholder="URL Website (www.example.com)"
                    value={newLinkUrl}
                    onChange={(e) => setNewLinkUrl(e.target.value)}
                    className="bg-transparent text-white placeholder-white/70 text-[13px] outline-none"
                  />
                  <div className="flex gap-2 mt-1">
                    <button
                      onClick={handleAddLink}
                      className="text-white text-[12px] font-semibold hover:underline"
                    >
                      Simpan
                    </button>
                    <button
                      onClick={() => {
                        setShowAddLink(false);
                        setNewLinkName("");
                        setNewLinkUrl("");
                      }}
                      className="text-white/70 text-[12px] hover:underline"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Lampiran Section */}
            <div className="mt-auto">
              <p className="text-white text-[15px] font-semibold mb-3">
                lampiran
              </p>
              <div className="flex items-center gap-8">

                {/* Upload File */}
                <label className="flex flex-col items-center gap-1 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span className="text-white text-[11px]">Upload file</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>

                {/* Add Link Button */}
                <button
                  onClick={() => setShowAddLink(!showAddLink)}
                  className="flex flex-col items-center gap-1 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  <span className="text-white text-[11px]">Link</span>
                </button>

              </div>
            </div>
          </div>

          {/* ===== RIGHT CARD ===== */}
          <div className="w-[200px] bg-[#F4A900] rounded-2xl p-5 flex flex-col items-center gap-6">

            {/* Label */}
            <p className="text-white text-[14px] font-semibold self-start w-full">
              Masukan target :
            </p>

            {/* Number Stepper */}
            <div className="flex items-center justify-center gap-3 w-full">

              {/* Prev */}
              <button
                onClick={handleTargetPrev}
                className="text-white hover:opacity-60 transition-opacity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {/* Number */}
              <span className="text-white text-[34px] font-bold leading-none">
                {String(target).padStart(2, "0")}
              </span>

              {/* Next */}
              <button
                onClick={handleTargetNext}
                className="text-white hover:opacity-60 transition-opacity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

            </div>

            {/* Buat Misi Button */}
            <button className="bg-[#4CAF50] text-white w-full py-2 rounded-full font-semibold text-[15px] hover:bg-[#43A047] transition-colors text-center">
              Buat Misi
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

