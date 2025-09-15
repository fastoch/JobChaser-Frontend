# Version Control

Résultat du `git remote -v`:
```bash
backup  https://github.com/fastoch/JobChaser-Frontend.git (fetch)
backup  https://github.com/fastoch/JobChaser-Frontend.git (push)
origin  https://git.alt-tools.tech/nordine-fabrice-bcs/JobChaser-Frontend.git (fetch)
origin  https://git.alt-tools.tech/nordine-fabrice-bcs/JobChaser-Frontend.git (push)
```

Pour pousser quotidiennement vers le repo Alt, utiliser le `source control` de VSCodium.    
Pour sauvegarder ponctuellement sur mon GitHub perso: `git push backup <branch_name>`  

- créer une branche "develop" sur le dépôt GitLab, ce sera notre branche principale durant le développement
- Après avoir cloné le projet depuis GitLab, se positionner sur la branche "develop": `git checkout develop`  
- récupérer la branche "develop" depuis le dépôt distant: `git pull origin develop`  
- chacun crée sa nouvelle branche et se positionne dessus, la syntaxe est : `git checkout -b <initiales_développeur>/JC-<num_ticket>`
  - exemple pour Fabrice: `git checkout -b fp/JC-64`
- On "stage" les fichiers modifiés localement pour préparer le commit: `git add .`
- On "commit": `git commit -m "mon_message"`
- On pousse notre branche vers le dépôt GitLab: `git push origin fp/JC-64`

# Conventions de nommage

Pour le travail en équipe, nous avons décidé de:
- ne pas nommer les interfaces avec un préfixe "I" ou un suffixe "Interface"
- 

# Implémentation du composant SearchBar

We'll be using **Zustand** for local state management and **TanStack Query** for handling server state.  

1. First, we need to add **zustand** and **@tanstack/react-query** to our project:
```bash
npm install zustand @tanstack/react-query
```

2. For TanStack Query to work, we need to wrap our application with a `QueryClientProvider`.  
A good place for this is in our main application **entry point**: main.tsx.  
**CHECKPOINT**: 
I must refactor the code inside `App.tsx` and `main.tsx`, because I'm not sure what should go where.

3. To ensure type safety for our search results, we create a shared type definition inside `src/shared/types.ts`.  
**CHECKPOINT**: 
I need to check all entities involved in the search functionality to make sure the type definition is correct.  

4. Next, we create a **Zustand store** to manage the local UI state of the `SearchBar`, such as the current 
search query and the visibility of the results dropdown: `src/stores/useSearchStore.ts`.

5. After that, we need to create a custom hook using TanStack Query to fetch search suggestions from the server.  
This hook will encapsulate the data-fetching logic: `src/api/useSearchSuggestions.ts`  

6. Finally, let's use our new store and hook inside the `SearchBar` component.  

With this implementation, our SearchBar uses Zustand for its internal UI state and TanStack Query
for fetching search suggestions.

# Implémentation de ...



# Exemples de requêtes SQL

