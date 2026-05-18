import { Client, Databases, ID, TablesDB, Query } from 'appwrite'

const database_id = import.meta.env.VITE_APPWRITE_DATABASE_ID
const project_id = import.meta.env.VITE_APPWRITE_PROJECT_ID
const db_table = import.meta.env.VITE_APPWRITE_TABLE_METRICS

const client = new Client()
    .setEndpoint('https://sgp.cloud.appwrite.io/v1')
    .setProject(project_id)

const tablesDB = new TablesDB(client);

const database = new Databases(client)

export const updateSearchCount = async (searchTerm, movieData) => {
    if (!searchTerm) return;

    try {
        const result = await tablesDB.listRows({
            databaseId: database_id,
            tableId: db_table,
            queries: [
                Query.equal('searchTerm', searchTerm),
            ]
        });


        if (result.rows.length > 0) {
            const row = result.rows[0];

            const promise = await tablesDB.updateRow(
                row.$databaseId,
                row.$tableId,
                row.$id,
                { 
                    count: row.count + 1,
                    movie_id : movieData.imdbID 
                }
            );

            promise.then(function (response) {
                console.log('Count Updated')
            }, function (error) {
                console.log(error);
            });;
        } else if (result.rows.length == 0) {
            const firstMovie = movieData;
            
            const insertPrromise = await tablesDB.createRow({
                databaseId: database_id,
                tableId: db_table,
                rowId: ID.unique(),
                data: {
                    searchTerm,
                    count: 1,
                    poster_url: firstMovie.Poster,
                    movie_id: firstMovie.imdbID
                }
            });

            insertPrromise.then(function (response) {
                console.log('Count Added')
            }, function (error) {
                console.log(error);
            });
        }
    } catch (e) {
        console.log(e.message)
    }
};

export const getTrendingMovies = async () => {
    
    try {
        const result = await tablesDB.listRows({
            databaseId: database_id,
            tableId: db_table,
            queries: [
                Query.limit(5),
                Query.orderDesc('count')
            ]
        });
        
        if(result && result.rows.length > 0) {
            return result.rows
        }
        
        return false;

    } catch (error) {
        console.log(error.message)
    }

}