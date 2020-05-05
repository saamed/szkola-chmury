RDS można wyłączyć na maksymalnie tydzień, po tym czasie są włączane z powrotem. 
Jesteśmy jednak nadal kasowani za zużywane dane oraz IOPS. 
Nie można zatrzymać bazy która:
- ma read replikę lub jest tą repliką,
- jest typu SQL Server w konfiguracji Multi-AZ

Klaster Aurory należy wyłączać wykorzystując funkcję stopDBCluster.


https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_StopInstance.html