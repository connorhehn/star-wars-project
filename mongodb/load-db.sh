for FILENAME in $(ls *.json)
do
    COLLECTION=$(echo $FILENAME | cut -f1 -d'.')
    mongoimport --uri mongodb://localhost:27017/swapi --collection ${COLLECTION} --drop --file ${COLLECTION}.json --jsonArray
done