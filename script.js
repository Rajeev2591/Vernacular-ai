const patientNameInput = document.getElementById("patientNameInput");
const patientAgeInput = document.getElementById("patientAgeInput");
const dispPatientName = document.getElementById("dispPatientName");
const dispPatientAge = document.getElementById("dispPatientAge");
const prescriptionTimestamp = document.getElementById("prescriptionTimestamp");
const dialogueInput = document.getElementById("dialogueInput");
const processBtn = document.getElementById("processBtn");
const outChief = document.getElementById("outChief");
const icdCodesContainer = document.getElementById("icdCodesContainer");
const prescriptionTableBody = document.getElementById("prescriptionTableBody");
const dispAbhaId = document.getElementById("dispAbhaId");

// Modal Elements
const verifyDosagesBtn = document.getElementById("verifyDosagesBtn");
const dosageModal = document.getElementById("dosageModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelModalBtn = document.getElementById("cancelModalBtn");
const saveMedicinesBtn = document.getElementById("saveMedicinesBtn");
const modalMedicinesList = document.getElementById("modalMedicinesList");

patientNameInput.addEventListener("input", () => {
    dispPatientName.innerText = patientNameInput.value.trim() || "Patient Name";
});
patientAgeInput.addEventListener("input", () => {
    dispPatientAge.innerText = patientAgeInput.value.trim() || "Age / Gender";
});

const now = new Date();
prescriptionTimestamp.innerText = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

// --- Enhanced Clinical Guidelines & Auto-Suggestion Mapping Engine ---
processBtn.addEventListener("click", () => {
    const rawText = dialogueInput.value.trim();
    const text = rawText.toLowerCase();
    
    if (!rawText) {
        alert("Please enter or record a consultation transcript first.");
        return;
    }

    processBtn.innerHTML = "⏳ Applying Medical Guidelines & Parsing Notes...";

    setTimeout(() => {
        let parsedName = patientNameInput.value.trim() || "New Patient";
        let parsedAge = patientAgeInput.value.trim() || "28 Yrs / Male";

        const nameMatch = rawText.match(/मेरा नाम\s+([^\s]+)\s+है/i);
        if (nameMatch && nameMatch[1]) {
            parsedName = nameMatch[1];
        }

        const ageMatch = rawText.match(/मेरी उम्र\s+([0-9]+\s*( साल|yrs?))/i);
        if (ageMatch && ageMatch[1]) {
            parsedAge = ageMatch[1] + " / Male";
        }

        patientNameInput.value = parsedName;
        patientAgeInput.value = parsedAge;
        dispPatientName.innerText = parsedName;
        dispPatientAge.innerText = parsedAge;
        dispAbhaId.innerText = `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10 + Math.random() * 90)}`;

        prescriptionTableBody.innerHTML = "";

        let chiefParts = [];
        let icdHTML = "";
        let meds = [];

        if (text.includes("बुखार") || text.includes("fever") || text.includes("सिर में दर्द") || text.includes("सिरदर्द") || text.includes("headache")) {
            chiefParts.push("Fever and severe headache");
            meds.push({ 
                name: "Tab. Paracetamol 650mg", 
                dosage: "1 Tablet • 1-1-1 (Three Times Daily)", 
                duration: "3 Days", 
                inst: "After Meals (For Pyrexia & Headache)" 
            });
            icdHTML += `
                <div class="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-200">
                    <span class="font-semibold text-slate-800">R50.9 - Fever & R51 - Headache</span>
                    <span class="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Primary</span>
                </div>
            `;
        }

        if (text.includes("जुकाम") || text.includes("cold") || text.includes("sore throat") || text.includes("nak")) {
            chiefParts.push("Acute coryza (cold / runny nose)");
            meds.push({ 
                name: "Tab. Cetirizine 10mg", 
                dosage: "1 Tablet • 0-0-1 (At Bedtime)", 
                duration: "3 Days", 
                inst: "At Night (For Cold & Sneezing)" 
            });
            icdHTML += `
                <div class="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-200">
                    <span class="font-semibold text-slate-800">J00 - Acute nasopharyngitis [common cold]</span>
                    <span class="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Secondary</span>
                </div>
            `;
        }

        if (text.includes("खांसी") || text.includes("cough")) {
            chiefParts.push("Persistent cough");
            meds.push({ 
                name: "Syrup Ambroxol + Dextromethorphan", 
                dosage: "10 ml • 1-1-1 (Three Times Daily)", 
                duration: "5 Days", 
                inst: "After Meals (For Cough Relief)" 
            });
            icdHTML += `
                <div class="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-200">
                    <span class="font-semibold text-slate-800">R05 - Cough</span>
                    <span class="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Secondary</span>
                </div>
            `;
        }

        if (text.includes("चक्कर") || text.includes("dizziness") || text.includes("vertigo") || text.includes("उल्टी")) {
            chiefParts.push("Dizziness / Vertigo");
            meds.push({ 
                name: "Tab. Betahistine 8mg", 
                dosage: "1 Tablet • 1-0-1 (Twice Daily)", 
                duration: "3 Days", 
                inst: "After Meals (For Dizziness & Vertigo)" 
            });
            icdHTML += `
                <div class="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-200">
                    <span class="font-semibold text-slate-800">R42 - Dizziness and giddiness</span>
                    <span class="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Secondary</span>
                </div>
            `;
        }

        if (meds.length === 0) {
            chiefParts.push("General acute viral illness symptoms");
            meds.push({ 
                name: "Tab. Paracetamol 650mg", 
                dosage: "1 Tablet • As Needed", 
                duration: "3 Days", 
                inst: "After Meals" 
            });
            icdHTML = `
                <div class="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-200">
                    <span class="font-semibold text-slate-800">R69 - Illness, unspecified</span>
                    <span class="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Primary</span>
                </div>
            `;
        }

        outChief.innerText = chiefParts.join(", ") + " as reported in patient dialogue.";
        icdCodesContainer.innerHTML = icdHTML;

        meds.forEach((m, idx) => {
            const tr = document.createElement("tr");
            tr.className = "hover:bg-slate-50";
            tr.innerHTML = `
                <td class="p-2.5 font-medium text-slate-500">${idx + 1}</td>
                <td class="p-2.5 font-bold text-slate-900 med-name">${m.name}</td>
                <td class="p-2.5 text-indigo-900 font-medium med-dosage">${m.dosage}</td>
                <td class="p-2.5 med-duration">${m.duration}</td>
                <td class="p-2.5 text-slate-600 med-instructions">${m.inst}</td>
            `;
            prescriptionTableBody.appendChild(tr);
        });

        processBtn.innerHTML = "⚡ Extract Clinical Note & Auto-Suggest Guidelines";
        alert(`✨ ${parsedName} के लिए सिरदर्द, बुखार, जुकाम, खांसी और चक्कर के लक्षणों के अनुसार सही दवाइयां और ICD-10 कोड अपडेट कर दिए गए हैं!`);
    }, 500);
});

// Open Dosage Modification Modal
verifyDosagesBtn.addEventListener("click", () => {
    modalMedicinesList.innerHTML = "";
    const rows = prescriptionTableBody.querySelectorAll("tr");
    
    rows.forEach((row, index) => {
        const name = row.querySelector(".med-name").innerText;
        const dosage = row.querySelector(".med-dosage").innerText;
        const duration = row.querySelector(".med-duration").innerText;
        const instructions = row.querySelector(".med-instructions").innerText;

        const div = document.createElement("div");
        div.className = "bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2 text-xs";
        div.innerHTML = `
            <div class="font-bold text-indigo-950">Medicine #${index + 1}</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                    <label class="block text-[10px] font-semibold text-slate-500 mb-0.5">Medicine Name:</label>
                    <input type="text" value="${name}" class="edit-name w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900 outline-none">
                </div>
                <div>
                    <label class="block text-[10px] font-semibold text-slate-500 mb-0.5">Dosage & Frequency:</label>
                    <input type="text" value="${dosage}" class="edit-dosage w-full p-2 bg-white border border-slate-300 rounded-lg text-xs text-indigo-900 font-medium outline-none">
                </div>
                <div>
                    <label class="block text-[10px] font-semibold text-slate-500 mb-0.5">Duration:</label>
                    <input type="text" value="${duration}" class="edit-duration w-full p-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-700 outline-none">
                </div>
                <div>
                    <label class="block text-[10px] font-semibold text-slate-500 mb-0.5">Instructions:</label>
                    <input type="text" value="${instructions}" class="edit-instructions w-full p-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-600 outline-none">
                </div>
            </div>
        `;
        modalMedicinesList.appendChild(div);
    });

    dosageModal.classList.remove("hidden");
});

[closeModalBtn, cancelModalBtn].forEach(btn => {
    btn.addEventListener("click", () => { dosageModal.classList.add("hidden"); });
});

saveMedicinesBtn.addEventListener("click", () => {
    const editRows = modalMedicinesList.querySelectorAll("div.bg-slate-50");
    const tableRows = prescriptionTableBody.querySelectorAll("tr");

    editRows.forEach((editRow, index) => {
        const newName = editRow.querySelector(".edit-name").value;
        const newDosage = editRow.querySelector(".edit-dosage").value;
        const newDuration = editRow.querySelector(".edit-duration").value;
        const newInstructions = editRow.querySelector(".edit-instructions").value;

        if (tableRows[index]) {
            tableRows[index].querySelector(".med-name").innerText = newName;
            tableRows[index].querySelector(".med-dosage").innerText = newDosage;
            tableRows[index].querySelector(".med-duration").innerText = newDuration;
            tableRows[index].querySelector(".med-instructions").innerText = newInstructions;
        }
    });

    dosageModal.classList.add("hidden");
    alert("✅ दवाइयां और डोज़ सफलतापूर्वक अपडेट कर दिए गए हैं!");
});

// --- Fixed Web Speech API Recording Implementation for Mobile ---
const recordMicBtn = document.getElementById("recordMicBtn");
const micIcon = document.getElementById("micIcon");
const micBtnText = document.getElementById("micBtnText");
const recStatusLabel = document.getElementById("recStatusLabel");

let recognition = null;
let isRecording = false;
let manualStop = false;
let finalTranscriptAccumulated = "";

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = true;       // Prevents mobile from shutting down after 2 seconds
    recognition.interimResults = true;   // Allows live speech feedback
    recognition.lang = 'hi-IN';

    recognition.onstart = () => {
        isRecording = true;
        micIcon.innerText = "⏹️";
        micBtnText.innerText = "Stop Scribing";
        recStatusLabel.innerText = "🔴 Ambient Recording Active...";
        recordMicBtn.classList.remove("bg-rose-600", "hover:bg-rose-700");
        recordMicBtn.classList.add("bg-slate-800", "hover:bg-slate-900", "animate-pulse");
    };

    recognition.onresult = (event) => {
        let interimTranscript = "";
        let currentFinal = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                currentFinal += event.results[i][0].transcript + " ";
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }

        if (currentFinal) {
            finalTranscriptAccumulated += currentFinal;
        }

        dialogueInput.value = (finalTranscriptAccumulated + interimTranscript).trim();
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
    };

    recognition.onend = () => {
        if (!manualStop && isRecording) {
            try {
                recognition.start();
                return;
            } catch (err) {
                console.log("Restart blocked or already started");
            }
        }
        stopListeningState();
    };
}

function stopListeningState() {
    isRecording = false;
    manualStop = false;
    micIcon.innerText = "🔴";
    micBtnText.innerText = "Start Listening";
    recStatusLabel.innerText = "Ambient Voice Scribe";
    recordMicBtn.classList.remove("bg-slate-800", "hover:bg-slate-900", "animate-pulse");
    recordMicBtn.classList.add("bg-rose-600", "hover:bg-rose-700");
}

recordMicBtn.addEventListener("click", () => {
    if (!recognition) {
        alert("Speech recognition is not supported in this browser. Please use Google Chrome or Edge over HTTPS.");
        return;
    }

    if (isRecording) {
        manualStop = true;
        isRecording = false;
        recognition.stop();
    } else {
        manualStop = false;
        
        // FIX: Clear out the transcript box and buffer entirely for a fresh recording session
        dialogueInput.value = "";
        finalTranscriptAccumulated = "";

        try { 
            recognition.start(); 
        } catch (err) { 
            console.error(err); 
        }
    }
});

// --- Text-To-Speech Implementation ---
const ttsBtn = document.getElementById("ttsBtn");
ttsBtn.addEventListener("click", () => {
    if (!('speechSynthesis' in window)) {
        alert("Text-to-speech is not supported on this browser.");
        return;
    }

    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        ttsBtn.innerHTML = "🔊 Listen Summary";
        return;
    }

    const textToSpeak = dialogueInput.value.trim();
    if (!textToSpeak) {
        alert("No text available to read.");
        return;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'hi-IN';
    ttsBtn.innerHTML = "🔊 Stop Audio";

    utterance.onend = () => { ttsBtn.innerHTML = "🔊 Listen Summary"; };
    utterance.onerror = () => { ttsBtn.innerHTML = "🔊 Listen Summary"; };

    window.speechSynthesis.speak(utterance);
});

document.getElementById("exportPdfBtn").addEventListener("click", () => {
    window.print();
});
