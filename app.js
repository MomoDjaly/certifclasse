// Configuration
const PASSWORD = 'Cisco2026'; // Mot de passe commun - MODIFIEZ-LE ICI

// Variables globales
let students = [];
let currentSessionId = null;

// Charger les données au démarrage
function loadData() {
    const saved = localStorage.getItem('students');
    if (saved) {
        students = JSON.parse(saved);
    }
    displayStudents();
}

// Sauvegarder les données
function saveData() {
    localStorage.setItem('students', JSON.stringify(students));
}

// Générer un ID de session unique
function generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Vérifier le mot de passe
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    if (password === PASSWORD) {
        // Créer une session
        currentSessionId = generateSessionId();
        sessionStorage.setItem('authenticated', 'true');
        sessionStorage.setItem('sessionId', currentSessionId);
        
        // Afficher la page principale
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('mainPage').style.display = 'block';
        
        loadData();
    } else {
        errorDiv.textContent = '❌ Mot de passe incorrect';
        errorDiv.style.display = 'block';
        document.getElementById('password').value = '';
    }
});

// Vérifier l'authentification au chargement
document.addEventListener('DOMContentLoaded', function() {
    const isAuth = sessionStorage.getItem('authenticated');
    
    if (isAuth === 'true') {
        currentSessionId = sessionStorage.getItem('sessionId');
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('mainPage').style.display = 'block';
        loadData();
    }
});

// Déconnexion
function logout() {
    sessionStorage.removeItem('authenticated');
    sessionStorage.removeItem('sessionId');
    currentSessionId = null;
    document.getElementById('loginPage').style.display = 'block';
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById('password').value = '';
}

// Afficher tous les étudiants
function displayStudents() {
    const grid = document.getElementById('studentGrid');
    const emptyState = document.getElementById('emptyState');
    
    grid.innerHTML = '';

    if (students.length === 0) {
        grid.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    grid.style.display = 'grid';
    emptyState.style.display = 'none';

    students.forEach((student, index) => {
        const canEdit = student.createdBy === currentSessionId;
        
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-header">
                <h2>${student.nom}</h2>
                <button class="edit-btn" onclick="editStudent(${index})" ${canEdit ? '' : 'disabled'}>
                    ${canEdit ? '✏️ Modifier' : '🔒 Lecture seule'}
                </button>
            </div>
            
            <div class="certif">
                <h3>📘 CISCO</h3>
                ${student.note_cisco ? 
                    `<div class="note">Note : ${student.note_cisco}</div>` : 
                    '<div class="no-data">Pas encore de note</div>'
                }
                ${student.image_cisco ? 
                    `<img src="${student.image_cisco}" alt="Certificat Cisco" onclick="openImage('${student.image_cisco}')">` : 
                    '<div class="no-data">Pas encore d\'image</div>'
                }
            </div>
            
            <div class="certif">
                <h3>🔶 ANSSI</h3>
                ${student.note_anssi ? 
                    `<div class="note">Note : ${student.note_anssi}</div>` : 
                    '<div class="no-data">Pas encore de note</div>'
                }
                ${student.image_anssi ? 
                    `<img src="${student.image_anssi}" alt="Certificat ANSSI" onclick="openImage('${student.image_anssi}')">` : 
                    '<div class="no-data">Pas encore d\'image</div>'
                }
            </div>
        `;
        grid.appendChild(card);
    });
}

// Ouvrir le formulaire (ajout)
function openForm() {
    document.getElementById('formModal').style.display = 'block';
    document.getElementById('formTitle').textContent = 'Ajouter un étudiant';
    document.getElementById('studentForm').reset();
    document.getElementById('editIndex').value = '';
    document.getElementById('current_image_cisco').innerHTML = '';
    document.getElementById('current_image_anssi').innerHTML = '';
}

// Modifier un étudiant
function editStudent(index) {
    const student = students[index];
    
    // Vérifier les permissions
    if (student.createdBy !== currentSessionId) {
        alert('❌ Vous ne pouvez modifier que les étudiants que vous avez ajoutés.');
        return;
    }
    
    document.getElementById('formModal').style.display = 'block';
    document.getElementById('formTitle').textContent = 'Modifier un étudiant';
    document.getElementById('editIndex').value = index;
    
    // Remplir le formulaire
    document.getElementById('nom').value = student.nom;
    document.getElementById('note_cisco').value = student.note_cisco || '';
    document.getElementById('note_anssi').value = student.note_anssi || '';
    
    // Afficher les images actuelles
    if (student.image_cisco) {
        document.getElementById('current_image_cisco').innerHTML = 
            `<small style="color: #667eea;">Image actuelle :</small><br>
            <img src="${student.image_cisco}" style="max-width: 100px; border-radius: 8px; margin-top: 5px;">`;
    }
    
    if (student.image_anssi) {
        document.getElementById('current_image_anssi').innerHTML = 
            `<small style="color: #667eea;">Image actuelle :</small><br>
            <img src="${student.image_anssi}" style="max-width: 100px; border-radius: 8px; margin-top: 5px;">`;
    }
}

// Fermer le formulaire
function closeForm() {
    document.getElementById('formModal').style.display = 'none';
    document.getElementById('studentForm').reset();
}

// Ouvrir une image en modal
function openImage(src) {
    document.getElementById('imageModal').style.display = 'block';
    document.getElementById('modalImage').src = src;
}

// Fermer le modal d'image
function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}

// Convertir une image en base64
function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// Gérer la soumission du formulaire
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('studentForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const editIndex = document.getElementById('editIndex').value;
        const nom = document.getElementById('nom').value.toUpperCase().trim();
        const note_cisco = document.getElementById('note_cisco').value.trim();
        const note_anssi = document.getElementById('note_anssi').value.trim();
        const file_cisco = document.getElementById('image_cisco').files[0];
        const file_anssi = document.getElementById('image_anssi').files[0];

        // Mode édition
        if (editIndex !== '') {
            const index = parseInt(editIndex);
            const student = students[index];
            
            // Vérifier les permissions
            if (student.createdBy !== currentSessionId) {
                alert('❌ Vous ne pouvez modifier que les étudiants que vous avez ajoutés.');
                return;
            }
            
            // Mettre à jour les données
            student.nom = nom;
            student.note_cisco = note_cisco || null;
            student.note_anssi = note_anssi || null;
            
            // Mettre à jour les images si de nouvelles sont uploadées
            if (file_cisco) {
                student.image_cisco = await toBase64(file_cisco);
            }
            if (file_anssi) {
                student.image_anssi = await toBase64(file_anssi);
            }
            
        } else {
            // Mode ajout
            let image_cisco = null;
            let image_anssi = null;

            if (file_cisco) {
                image_cisco = await toBase64(file_cisco);
            }

            if (file_anssi) {
                image_anssi = await toBase64(file_anssi);
            }

            // Ajouter l'étudiant avec l'ID de session
            students.push({
                nom: nom,
                note_cisco: note_cisco || null,
                note_anssi: note_anssi || null,
                image_cisco: image_cisco,
                image_anssi: image_anssi,
                createdBy: currentSessionId, // Marquer qui a créé cet étudiant
                createdAt: new Date().toISOString()
            });
        }

        // Sauvegarder et afficher
        saveData();
        displayStudents();
        closeForm();
    });

    // Fermer le modal en cliquant à l'extérieur
    window.onclick = function(event) {
        const formModal = document.getElementById('formModal');
        if (event.target == formModal) {
            closeForm();
        }
    }
});
