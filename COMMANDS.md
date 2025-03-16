Do uruchomienia serwera używamy poleceń
```
// Jeśli chcemy hostować serwer lokalnie na naszym systemie, używamy
ng serve

// Aby mieć możliwość uzyskania dostępu do serwera z poziomu sieci lokalnej, dodajemy następujący parametr
ng serve --host 0.0.0.0

// Jeśli chcemy hostować serwer w kontenerze dockera, używamy
docker compose up --build
```

Do tworzenia nowych klas w Angularze, używamy Angular CLI

```
// Do tworzenia komponentu używamy
ng generate component <nazwa>

// Do tworzenia serwisu używamy
ng generate service <nazwa>

// Do tworzenia modułu używamy
ng generate module <nazwa>
```
