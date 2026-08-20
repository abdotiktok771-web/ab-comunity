const authModal = document.getElementById('authModal');
const contactModal = document.getElementById('contactModal');
const openAuthModalBtn = document.getElementById('openAuthModal');
const openContactModalBtn = document.getElementById('openContactModal');
const authForm = document.getElementById('authForm');
const stepRole = document.getElementById('stepRole');
const modalTitle = document.getElementById('modalTitle');
const freelancerExtraFields = document.getElementById('freelancerExtraFields');
const ageGroup = document.getElementById('ageGroup');

// التنقل بين الصفحات
function showSection(sectionId) {
    document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// التحكم في النوافذ المنبثقة
openAuthModalBtn.addEventListener('click', () => {
    authModal.classList.add('active');
    stepRole.style.display = 'block';
    authForm.style.display = 'none';
    modalTitle.innerText = "تسجيل حساب جديد";
});

openContactModalBtn.addEventListener('click', () => contactModal.classList.add('active'));

window.addEventListener('click', (e) => {
    if (e.target === authModal) authModal.classList.remove('active');
    if (e.target === contactModal) contactModal.classList.remove('active');
});

// اختيار الدور في النافذة
function selectRole(role) {
    stepRole.style.display = 'none';
    authForm.style.display = 'block';
    
    if (role === 'client') {
        modalTitle.innerText = "تسجيل حساب عميل";
        ageGroup.style.display = 'none';
        freelancerExtraFields.style.display = 'none';
    } else {
        modalTitle.innerText = "تسجيل حساب فري لانسر";
        ageGroup.style.display = 'block';
        freelancerExtraFields.style.display = 'block';
    }
}