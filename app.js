// ==========================================
// 1. FUNGSI DASAR
// ==========================================

const $ = function (id) {
    return document.getElementById(id);
};


// ==========================================
// 2. NAVIGASI SIDEBAR
// ==========================================

const pages = {

    lamaran: {
        title: "Lamaran Kerja",
        id: "page-lamaran"
    },

    cv: {
        title: "Curriculum Vitae",
        id: "page-cv"
    },

    ats: {
        title: "CV ATS-Friendly",
        id: "page-ats"
    },

    template: {
        title: "CV Berdasarkan Template",
        id: "page-template"
    }

};


function showPage(key) {

    if (!pages[key]) {
        return;
    }

    document.querySelectorAll(".page").forEach(function (page) {

        page.classList.remove("active");

    });

    $(pages[key].id).classList.add("active");

    document.querySelectorAll(".nav-item").forEach(function (button) {

        button.classList.toggle(
            "active",
            button.dataset.page === key
        );

    });

    $("breadcrumbTitle").textContent = pages[key].title;

    closeMobileNav();

}


// Klik menu sidebar.
document.querySelectorAll(".nav-item").forEach(function (button) {

    button.addEventListener("click", function () {

        showPage(button.dataset.page);

    });

});


// Tombol navigasi antarhalaman.
document.querySelectorAll("[data-go]").forEach(function (button) {

    button.addEventListener("click", function () {

        showPage(button.dataset.go);

    });

});


// ==========================================
// 3. FORMAT TANGGAL
// ==========================================

function formatDate(value) {

    if (!value) {
        return "";
    }

    const date = new Date(value + "T00:00:00");

    return new Intl.DateTimeFormat("id-ID", {

        day: "2-digit",
        month: "long",
        year: "numeric"

    }).format(date);

}


// ==========================================
// 4. MEMBANTU MENAMPILKAN TEKS
// ==========================================

function text(id, value, fallback = "—") {

    const element = $(id);

    element.textContent =
        value && value.trim()
            ? value.trim()
            : fallback;

}


// ==========================================
// 5. MENGAMBIL DATA FORMULIR
// ==========================================

function val(formId, name) {

    const field = $(formId).elements[name];

    return field
        ? (field.value || "").trim()
        : "";

}


// ==========================================
// 6. MENGHUBUNGKAN FORMULIR DENGAN PREVIEW
// ==========================================

function bindInput(formId, callback) {

    const form = $(formId);

    form.addEventListener("input", callback);

    form.addEventListener("change", callback);

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        if (!form.reportValidity()) {
            return;
        }

        callback();

    });

}


// ==========================================
// 7. SURAT LAMARAN KERJA
// ==========================================

function updateLetter() {

    // Tanggal surat.
    const date = val("letterForm", "date");

    text(
        "pLetterDate",
        "Pasuruan, " + (formatDate(date) || "tanggal surat")
    );


    // Perusahaan.
    text(
        "pCompany",
        "HRD " + (
            val("letterForm", "company") || "Nama perusahaan"
        )
    );

    text(
        "pCompanyAddress",
        val("letterForm", "companyAddress"),
        "Alamat perusahaan"
    );

    text(
        "pJobTitle",
        val("letterForm", "jobTitle"),
        "Posisi yang dilamar"
    );


    // Identitas pelamar.
    text(
        "pApplicantName",
        val("letterForm", "name"),
        "Nama lengkap"
    );

    text(
        "pSignName",
        val("letterForm", "name"),
        "Nama lengkap"
    );


    // Tempat dan tanggal lahir.
    const birth = [

        val("letterForm", "birthPlace"),

        formatDate(
            val("letterForm", "birthDate")
        )

    ].filter(Boolean).join(", ");


    text(
        "pBirth",
        birth,
        "Tempat, tanggal lahir"
    );


    // Pendidikan.
    text(
        "pEducation",
        val("letterForm", "education"),
        "Pendidikan terakhir"
    );


    // Alamat.
    text(
        "pAddress",
        val("letterForm", "address"),
        "Alamat domisili"
    );


    // Kontak.
    text(
        "pEmail",
        val("letterForm", "email"),
        "Email"
    );

    text(
        "pPhone",
        val("letterForm", "phone"),
        "Nomor telepon"
    );


    // Pengalaman tambahan.
    const experience = val("letterForm", "experience");

    $("pExperience").hidden = !experience;

    $("pExperience").textContent = experience
        ? "Pengalaman/keterangan: " + experience
        : "";


    // Daftar lampiran.
    const list = $("pAttachments");

    list.replaceChildren();

    val("letterForm", "attachments")
        .split("\n")
        .map(function (item) {
            return item.trim();
        })
        .filter(Boolean)
        .forEach(function (item) {

            const div = document.createElement("div");

            div.textContent = item;

            list.appendChild(div);

        });


    // Kalimat penutup.
    text(
        "pClosing",
        val("letterForm", "closing"),
        ""
    );

}


bindInput("letterForm", updateLetter);


// ==========================================
// 8. CURRICULUM VITAE PROFESIONAL
// ==========================================

function updateCV() {

    text(
        "pCvName",
        val("cvForm", "name") || "NAMA LENGKAP"
    );

    text(
        "pCvHeadline",
        val("cvForm", "headline"),
        "Jabatan / Profesi"
    );

    text(
        "pCvEmail",
        "✉ " + (val("cvForm", "email") || "Email")
    );

    text(
        "pCvPhone",
        "☎ " + (val("cvForm", "phone") || "Telepon")
    );

    text(
        "pCvLocation",
        "⌖ " + (val("cvForm", "location") || "Domisili")
    );


    text(
        "pCvSummary",
        val("cvForm", "summary"),
        "Tuliskan ringkasan profil profesional Anda."
    );


    $("pCvEducation").textContent =
        val("cvForm", "education") ||
        "Institusi pendidikan | Tahun\nProgram studi";


    $("pCvExperience").textContent =
        val("cvForm", "experience") ||
        "Nama perusahaan | Periode\nJabatan dan tanggung jawab";


    // Keterampilan.
    const skills = val("cvForm", "skills")
        .split(",")
        .map(function (skill) {
            return skill.trim();
        })
        .filter(Boolean);


    const skillList = $("pCvSkills");

    skillList.replaceChildren();


    const daftarSkills = skills.length
        ? skills
        : ["Komunikasi", "Kerja tim", "Microsoft Office"];


    daftarSkills.forEach(function (skill) {

        const li = document.createElement("li");

        li.textContent = skill;

        skillList.appendChild(li);

    });

}


bindInput("cvForm", updateCV);


// ==========================================
// 9. FOTO PROFIL CV
// ==========================================

let cvPhotoUrl = "";


$("cvPhoto").addEventListener("change", function (event) {

    const file = event.target.files &&
        event.target.files[0];

    const image = $("pCvPhoto");


    // Hapus URL foto lama.
    if (cvPhotoUrl) {

        URL.revokeObjectURL(cvPhotoUrl);

        cvPhotoUrl = "";

    }


    if (file && file.type.startsWith("image/")) {

        cvPhotoUrl = URL.createObjectURL(file);

        image.src = cvPhotoUrl;

        image.hidden = false;

    } else {

        image.removeAttribute("src");

        image.hidden = true;

    }

});


// ==========================================
// 10. CV ATS-FRIENDLY
// ==========================================

function updateATS() {

    text(
        "pAtsName",
        val("atsForm", "name") || "NAMA LENGKAP"
    );

    text(
        "pAtsHeadline",
        val("atsForm", "headline"),
        "Jabatan / Profesi"
    );

    text(
        "pAtsContact",
        val("atsForm", "contact"),
        "Email | Telepon | Domisili"
    );

    text(
        "pAtsSummary",
        val("atsForm", "summary"),
        "Ringkasan profesional"
    );

    text(
        "pAtsExperience",
        val("atsForm", "experience"),
        "Pengalaman kerja"
    );

    text(
        "pAtsEducation",
        val("atsForm", "education"),
        "Riwayat pendidikan"
    );

    text(
        "pAtsSkills",
        val("atsForm", "skills"),
        "Keterampilan"
    );

    text(
        "pAtsCertificates",
        val("atsForm", "certificates"),
        "—"
    );

}


bindInput("atsForm", updateATS);


// ==========================================
// 11. TANGGAL OTOMATIS
// ==========================================

function localISODate() {

    const date = new Date();

    const year = date.getFullYear();

    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        date.getDate()
    ).padStart(2, "0");


    return `${year}-${month}-${day}`;

}


// Isi tanggal surat.
$("letterDate").value = localISODate();


// ==========================================
// 12. RESET FORMULIR
// ==========================================

document.querySelectorAll("[data-reset]").forEach(function (button) {

    button.addEventListener("click", function () {

        const type = button.dataset.reset;


        const formMap = {

            letter: "letterForm",
            cv: "cvForm",
            ats: "atsForm"

        };


        const form = $(formMap[type]);


        if (!window.confirm(
            "Kosongkan seluruh isian formulir ini?"
        )) {

            return;

        }


        // Kembalikan nilai bawaan formulir.
        form.reset();


        if (type === "letter") {

            $("letterDate").value = localISODate();

            updateLetter();

        }


        if (type === "cv") {

            if (cvPhotoUrl) {

                URL.revokeObjectURL(cvPhotoUrl);

                cvPhotoUrl = "";

            }

            $("pCvPhoto").removeAttribute("src");

            $("pCvPhoto").hidden = true;

            updateCV();

        }


        if (type === "ats") {

            updateATS();

        }

    });

});


// ==========================================
// 13. PILIH TEMPLATE CV
// ==========================================

document.querySelectorAll("[data-template]").forEach(function (button) {

    button.addEventListener("click", function () {

        document.querySelectorAll("[data-template]")
            .forEach(function (item) {

                item.classList.remove("selected");

            });


        button.classList.add("selected");


        const template = button.dataset.template;


        $("cvPaper").classList.remove(
            "template-minimal",
            "template-classic"
        );


        $("cvPaper").classList.toggle(
            "template-minimal",
            template === "minimal"
        );


        $("cvPaper").classList.toggle(
            "template-classic",
            template === "classic"
        );


        if (template === "ats") {

            showPage("ats");

        } else {

            showPage("cv");

        }

    });

});


// ==========================================
// 14. CETAK / SIMPAN PDF
// ==========================================

function printCurrent() {

    const active = document.querySelector(
        ".page.active"
    );


    if (!active) {
        return;
    }


    if (active.id === "page-template") {

        showPage("cv");

    }


    document.querySelectorAll(".page").forEach(function (page) {

        page.classList.remove("printing");

    });


    const selectedPage = document.querySelector(
        ".page.active"
    );


    selectedPage.classList.add("printing");


    // Berikan kesempatan browser memperbarui layout.
    requestAnimationFrame(function () {

        window.print();

    });

}


// Semua tombol cetak.
document.querySelectorAll("[data-print]").forEach(function (button) {

    button.addEventListener("click", printCurrent);

});


// Bersihkan status setelah dialog cetak ditutup.
window.addEventListener("afterprint", function () {

    document.querySelectorAll(".page").forEach(function (page) {

        page.classList.remove("printing");

    });

});


// ==========================================
// 15. NAVIGASI MOBILE
// ==========================================

const sidebar = $("sidebar");

const scrim = $("mobileScrim");


$("menuToggle").addEventListener("click", function () {

    sidebar.classList.toggle("open");

    scrim.classList.toggle("show");

});


function closeMobileNav() {

    sidebar.classList.remove("open");

    scrim.classList.remove("show");

}


scrim.addEventListener("click", closeMobileNav);


// ==========================================
// 16. INISIALISASI PRATINJAU
// ==========================================

updateLetter();

updateCV();

updateATS();