Top 10 movies rated by IMDB

License: Data courtesy of IMDB, see under License

Author: Marko Bunic

Version: 1.0

Created for: Educational use, Faculty project

Creation Date: 31-10-2022

Last modification: 31-10-2022

Language: English

Theme: Ranking

Keywords: Movies, Rating, Top Rated, IMDB

Accesible formats: CSV, JSON

Database structure:


	TABLE1 - Movies

		Atributes:[Movie_ID,Movie_Name,Director,Genre,Stars,Rating,IMDB ranking,Awards,Movie_Year,Movie_Length] 
	
		Primary Key: Movie_ID

	TABLE2 - Actors
	
		Atributes: [Actor_ID,Actor_Name,CountryFrom,Awards,BestRatedFilmAppearanceID]
		
		Primary Key: Actor_ID

		Foreign Key: BestRatedFilmAppearanceID -> references Movies (Movie_ID)

*All of data from this Database can be found on IMDB site, intention of this database is to extract the data and make it easier 
to use with software, for educational purposes only, there is no commercial use associated with this dataset.

*Even though there are mutliple movies and actors with the same name, we are assuming that the chance that they appear together 
on IMDB top 10 or even top 100 list is small enough to be ignored, so table attributes movie and actors name are set as UNIQUE.