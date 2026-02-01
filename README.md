# Portfolio Certifications - Classe 2026

Portfolio web sécurisé pour afficher les certifications Cisco et ANSSI des étudiants avec système d'authentification.

## 🔐 Fonctionnalités

- ✅ **Authentification par mot de passe commun** - Accès sécurisé
- ✅ **Sans base de données** - Utilise localStorage du navigateur
- ✅ **Permissions de modification** - On ne peut modifier que ce qu'on a ajouté
- ✅ **Hébergement GitHub Pages** - Gratuit et simple
- ✅ **Images en base64** - Stockées directement dans le navigateur
- ✅ **Responsive** - Fonctionne sur mobile et desktop

## 🔑 Mot de passe

Le mot de passe par défaut est : **Cisco2026**

Pour le modifier, ouvrez le fichier `app.js` et changez cette ligne :
```javascript
const PASSWORD = 'Cisco2026'; // Modifiez ici
```

## 📦 Installation sur GitHub

### Méthode 1 : Depuis GitHub.com (Recommandée)

1. **Créez un nouveau repository** sur GitHub
   - Cliquez sur "New repository"
   - Nommez-le (ex: `portfolio-certifications`)
   - Cochez "Public"
   - Cliquez sur "Create repository"

2. **Uploadez les fichiers**
   - Cliquez sur "uploading an existing file"
   - Glissez-déposez les fichiers :
     - `index.html`
     - `app.js`
     - `README.md`
   - Cliquez sur "Commit changes"

3. **Activez GitHub Pages**
   - Allez dans **Settings** → **Pages**
   - Dans **Source**, sélectionnez `main` branch
   - Cliquez sur **Save**
   - Attendez 1-2 minutes

4. **Accédez à votre site**
   - URL : `https://votre-username.github.io/portfolio-certifications/`

### Méthode 2 : Avec Git (Terminal)

```bash
# Créer un nouveau dossier
mkdir portfolio-certifications
cd portfolio-certifications

# Copier les fichiers index.html, app.js et README.md dans ce dossier

# Initialiser Git
git init
git add .
git commit -m "Initial commit"

# Créer un repo sur GitHub, puis :
git remote add origin https://github.com/VOTRE-USERNAME/portfolio-certifications.git
git branch -M main
git push -u origin main

# Activer GitHub Pages dans Settings → Pages
```

## 🎯 Utilisation

### Première connexion
1. Accédez au site
2. Entrez le mot de passe commun : `Cisco2026`
3. Cliquez sur "Se connecter"

### Ajouter un étudiant
1. Cliquez sur "➕ Ajouter un étudiant"
2. Remplissez le formulaire :
   - **Nom** : Nom de l'étudiant (obligatoire)
   - **Note Cisco** : Note obtenue (optionnel)
   - **Image Cisco** : Certificat scanné (optionnel)
   - **Note ANSSI** : Note obtenue (optionnel)
   - **Image ANSSI** : Certificat scanné (optionnel)
3. Cliquez sur "💾 Enregistrer"

### Modifier un étudiant
- Vous pouvez **SEULEMENT** modifier les étudiants que vous avez ajoutés
- Les boutons de modification seront grisés pour les autres étudiants
- Cliquez sur "✏️ Modifier" pour éditer vos propres ajouts

### Voir les certifications
- Toutes les certifications sont visibles par tous
- Cliquez sur une image pour l'agrandir
- Les cartes affichent le nom, les notes et les certificats

## 🔒 Système de permissions

### Comment ça marche ?
- Chaque session de navigateur reçoit un ID unique
- Quand vous ajoutez un étudiant, il est marqué avec votre session ID
- Vous ne pouvez modifier que les étudiants créés avec votre session
- Les autres peuvent voir mais pas modifier

### Limites
- Les permissions sont basées sur la session du navigateur
- Si vous videz le cache, vous perdez votre session
- Si vous changez de navigateur, vous aurez une nouvelle session

## 💾 Stockage des données

### Où sont stockées les données ?
- Dans le **localStorage** de votre navigateur
- Chaque utilisateur a ses propres données locales
- Les images sont converties en base64

### Partage des données
Pour que tous voient les mêmes données, deux options :

**Option 1 : Navigateur commun**
- Tous les étudiants utilisent le même ordinateur/navigateur
- Les données sont partagées automatiquement

**Option 2 : Export/Import manuel**
1. Console navigateur (F12)
2. Tapez : `JSON.stringify(localStorage.getItem('students'))`
3. Copiez le résultat
4. Partagez-le avec d'autres
5. Sur un autre navigateur : `localStorage.setItem('students', 'COLLEZ_ICI')`

## ⚠️ Limitations

- **Stockage limité** : localStorage max ~5-10 MB
- **Données locales** : Pas de synchronisation automatique entre utilisateurs
- **Pas de backup** : Si vous videz le cache, données perdues
- **Permissions temporaires** : Basées sur la session navigateur

## 🔧 Personnalisation

### Changer le mot de passe
Fichier : `app.js`
```javascript
const PASSWORD = 'VotreNouveauMotDePasse';
```

### Modifier les couleurs
Fichier : `index.html` (section `<style>`)
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Ajouter d'autres certifications
Modifiez les sections dans `index.html` et `app.js`

## 🚀 Évolutions possibles

Pour une version plus avancée avec :
- Synchronisation automatique entre utilisateurs
- Base de données centralisée
- Gestion des utilisateurs individuels

Considérez :
- **Firebase** (gratuit pour petits projets)
- **Supabase** (alternative open-source à Firebase)
- **GitHub Gist** (pour stockage JSON simple)

## 📞 Support

Pour toute question :
1. Vérifiez ce README
2. Consultez les commentaires dans le code
3. Créez une issue sur GitHub

## 📄 Licence

Projet libre d'utilisation pour usage éducatif.

---

**Note importante** : Ce système est conçu pour une utilisation en classe ou en petit groupe. Pour une utilisation à grande échelle ou avec des données sensibles, envisagez une solution avec base de données et authentification individuelle.
