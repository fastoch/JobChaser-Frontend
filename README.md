# Version Control

Résultat du `git remote -v`:
```bash
backup  https://github.com/fastoch/JobChaser-Frontend.git (fetch)
backup  https://github.com/fastoch/JobChaser-Frontend.git (push)
origin  https://git.alt-tools.tech/nordine-fabrice-bcs/JobChaser-Frontend.git (fetch)
origin  https://git.alt-tools.tech/nordine-fabrice-bcs/JobChaser-Frontend.git (push)
```

Pour pousser quotidiennement vers le repo Alt, utiliser le `source control` de VSCodium.    
Pour sauvegarder ponctuellement sur mon GitHub perso: `git push backup master`  

- créer une branche "develop" sur le dépôt GitLab, ce sera notre branche principale durant le développement
- Après avoir cloné le projet depuis GitLab, se positionner sur la branche "develop": `git checkout develop`  
- récupérer la branche "develop" depuis le dépôt distant: `git pull origin develop`  
- chacun crée sa nouvelle branche et se positionne dessus, la syntaxe est : `git checkout -b <initiales_développeur>/JC-<num_ticket>`
  - exemple pour Nordine: `git checkout -b nh/JC-56`

# Conventions de nommage

Pour le travail en équipe, nous avons décidé de:
- ne pas nommer les interfaces avec un préfixe "I" ou un suffixe "Interface"
- 

# Exemples de requêtes SQL

