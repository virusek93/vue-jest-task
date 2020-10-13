# Zadania

Cześć, <br>w powyższym repozytorium znajdziesz bazową aplikacje VUE. Proszę zaimplementuj w niej poniższe zadania. Praca z gitem jest równie oceniana, mniej to na uwadze dodająć swój kod.

## Formularz dodawania produktu

1. Formularz musi zawierać pola:

- Nazwa produktu (wymagane / text)
- Opis produktu (wymagane / textarea)
- Cena (wymagane / price - cena produktu powinna być wyświetlana z dokładnością do 2 miejsc po przecinku)
- Kategoria (wymagane / select)

2. Walidacja przy zapisaniu formularza

## Widok listy produktów

1. Główna strona aplikacji powinna zawierać tabelę z produktami dodanymi przez użytkownika.
2. Dodanie możliwości edycji produktu

## Nawigacja

1.  dodanie w nagłówku linków do strony z listą i formularzem dodawania produktu, jeżeli jesteśmy na stronie z listą widzimy jedynie link do dodawania produktu.

## Drzewo Kategorii

W pliku `src/categories.json`, znajduje się lista kategorii w formie płaskiej tablicy:

```
{
  "categories": [
    { "id": 1, "parent": null, "title": "Women" },
    { "id": 2, "parent": null, "title": "Man" },
    { "id": 3, "parent": 1, "title": "Shoes" },
    { "id": 4, "parent": 3, "title": "Pumps" },
    { "id": 5, "parent": 3, "title": "Sandals" },
    { "id": 6, "parent": 2, "title": "Shoes" },
    { "id": 7, "parent": 6, "title": "Sneakers" },
    { "id": 8, "parent": 6, "title": "Slippers" }
  ]
}
```

Na jej podstawie zbuduj drzewo i wyświetl kategorie na stronie

```
const categories = [
  {
    id: 1,
    parent: null,
    title: 'Women',
    subcategories: [
       {
          id: 3,
          parent: 1,
          value: 'Shoes',
          subcategories: [
            {
              id: 4,
              parent: 3,
              value: 'Pumps'
            }
          ]
        },
    ]},
```

## Testy

1. Projekt powinien zostać otestowany.
