Top 10 movies rated by IMDB

License:

Author: Marko Bunic

Version: 0

Language: English

Database structure:


	TABLE1 - Movies

		Atributes:[Movie_ID,Movie_Name,Director,Genre,Stars,Rating,IMDB ranking,Awards,Movie_Year,Movie_Length] 
	
		Primary Key: Movie_ID

	TABLE2 - Actors
	
		Atributes: [Actor_ID,Actor_Name,CountryFrom,Awards,BestRatedFilmAppearanceID]
		
		Primary Key: Actor_ID

		Foreign Key: BestRatedFilmAppearanceID -> references Movies (Movie_ID)

*Even though there are mutliple movies and actors with the same name, we are assuming that the chance that they appear together 
on IMDB top 10 or even top 100 list is small enough to be ignored, so table attributes movie and actors name are set as UNIQUE.