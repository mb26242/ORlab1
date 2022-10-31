Top 10 movies rated by IMDB

License: Commercial Use

	Limited non-commercial use of IMDb data is allowed, provided the following conditions are met: 

	1.You agree to all the terms of our copyright/conditions of use statement.
	Please also note that IMDb reserves the right to withdraw permission to use the data at any time at our discretion.

	2.The data must be taken only from the datasets made available (see IMDb Contributor Datasets . You may not use data mining, robots, screen scraping, or similar online data gathering and extraction tools on our website. If the information/data you want is not present in our datasets, it means it's not available for non-commercial usage.

	3.The data can only be used for personal and non-commercial use and must not be altered/republished/resold/repurposed to create any kind of online/offline database of movie information (except for individual personal use). Please refer to the copyright/license information enclosed in each file for further instructions and limitations on allowed usage.

	4.You must acknowledge the source of the data by including the following statement:

	Information courtesy of
	IMDb
	(https://www.imdb.com).
	Used with permission.


	5.We reserve the right to deny any individual request for any reason.


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