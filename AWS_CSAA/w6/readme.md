Tydzień 6:
Oznaczenie zasobów tagiem ENV=TEST.
W skrypcie do Lambdy wyszukujemy wszystkie włączone instancje EC2 z danym tagiem i je wyłączamy.
W CloudWatch dodajemy scheduled event, który wyłącza maszyny o 22 UTC. Wykorzystujemy Cron expression  0 22 * * ? *.

Chcąc dodać wodotrysków możemy pobrać wszystkie Autoscaling Groups z tagiem ENV=TEST. Następnie możemy wyciągnąć z nich listę instancji i odfiltrować z listy pobranej wyżej by ich nie wyłączać niepotrzebnie. Inną opcją jest zmiana wartości DesiredCapacity na 0 (co może ciągnąć za sobą zmianę MinSize). W takim wypadku chcąc wystartować instancje w ramach ASG będziemy musieli przywrócić poprzednie wartości np. na podstawie wartości tagów.

Analogicznie do ASG możemy zmodyfikować Spot Instance Requests oraz Spot Fleet Requests.