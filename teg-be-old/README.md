# Instalacion
duplicar el .env.example con el nombre .env
- configurar base de datos y puertos del servicio

# Ejecutar

Ejecutar en dos terminales distintas:

npm run compile

npm run start

Para conectarse a la base de datos usando IDX correr el comando:
ssh -L 3306:localhost:3306 root@109.199.110.212


# Enums
game status:
0 creando sala
1 en partida
2 partida terminada

game phase:
0 5 primeras fichas
1 3 segundas fichas
2 colocar fichas
3 ataque
4 reposicional

usersgames:
0 azul
1 rojo
2 verde
3 rosa
4 negro
5 amarillo
