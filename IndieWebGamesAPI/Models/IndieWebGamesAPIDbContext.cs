namespace IndieWebGamesAPI.Models
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;

    public class IndieWebGamesAPIDbContext : DbContext
    {
        // Your context has been configured to use a 'IndieWebGamesAPIDbContext' connection string from your application's 
        // configuration file (App.config or Web.config). By default, this connection string targets the 
        // 'IndieWebGamesAPI.Models.IndieWebGamesAPIDbContext' database on your LocalDb instance. 
        // 
        // If you wish to target a different database and/or database provider, modify the 'IndieWebGamesAPIDbContext' 
        // connection string in the application configuration file.
        public IndieWebGamesAPIDbContext()
            : base("name=IndieWebGamesConn")
        {
        }

        // Add a DbSet for each entity type that you want to include in your model. For more information 
        // on configuring and using a Code First model, see http://go.microsoft.com/fwlink/?LinkId=390109.

        //public virtual DbSet<MyEntity> MyEntities { get; set; }
        //public List<IndiePlayerProfile> IndiePlayerProfiles { get; set; }
        

        public System.Data.Entity.DbSet<IndieWebGamesAPI.Models.IndiePlayerProfile> IndiePlayerProfiles { get; set; }
        public DbSet<Levels> Levels { get; set; }
    }

    //public class MyEntity
    //{
    //    public int Id { get; set; }
    //    public string Name { get; set; }
    //}
}