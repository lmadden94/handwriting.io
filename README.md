# handwriting.io-generator 
This utility allows to you generate handwriting images from handwriting.io within via a CLI. You can also drive handwriting production with a spreadsheet.


## Get a handwriting
Returns specific handwriting style details in a cli-table.
```
dominick:$ node src/js/interface.js --api_key=YOUR_API_KEY --api_secret=YOUR_API_SECRET --action=get-handwriting --handwriting_id=HANDWRITING_ID

┌────────────────────────┬─────────────────────────────┐
│ id                     │ 7EQMJPSG00H9                │
├────────────────────────┼─────────────────────────────┤
│ title                  │ Beekman                     │
├────────────────────────┼─────────────────────────────┤
│ date_created           │ 2016-01-06T20:49:46.337723Z │
├────────────────────────┼─────────────────────────────┤
│ date_modified          │ 2016-01-06T20:49:46.337723Z │
├────────────────────────┼─────────────────────────────┤
│ rating_neatness        │ 1400                        │
├────────────────────────┼─────────────────────────────┤
│ rating_cursivity       │ 1400                        │
├────────────────────────┼─────────────────────────────┤
│ rating_embellishment   │ 1400                        │
├────────────────────────┼─────────────────────────────┤
│ rating_character_width │ 1400                        │
└────────────────────────┴─────────────────────────────┘

```

## Get all handwritings
Lists all handwritings and style details in a cli-table.

```
dominick:$ node src/js/interface.js --api_key=YOUR_API_KEY --api_secret=YOUR_API_SECRET --action=get-handwritings

┌──────────────┬────────────────┬─────────────────────────────┬─────────────────────────────┬─────────────────┬──────────────────┬──────────────────────┬────────────────────────┐
│ id           │ title          │ date_created                │ date_modified               │ rating_neatness │ rating_cursivity │ rating_embellishment │ rating_character_width │
├──────────────┼────────────────┼─────────────────────────────┼─────────────────────────────┼─────────────────┼──────────────────┼──────────────────────┼────────────────────────┤
│ 2D5QW0F80001 │ Molly          │ 2015-04-30T21:27:45.979398Z │ 2016-01-06T20:28:09.55861Z  │ 1459            │ 1286             │ 1367                 │ 1339                   │
├──────────────┼────────────────┼─────────────────────────────┼─────────────────────────────┼─────────────────┼──────────────────┼──────────────────────┼────────────────────────┤
│ 2D5S18M00002 │ Winters        │ 2015-04-30T21:30:18.575741Z │ 2015-12-16T15:18:27.777815Z │ 1425            │ 1319             │ 1373                 │ 1236                   │
├──────────────┼────────────────┼─────────────────────────────┼─────────────────────────────┼─────────────────┼──────────────────┼──────────────────────┼────────────────────────┤
│ 2D5S46A80003 │ Perry          │ 2015-04-30T21:30:30.568965Z │ 2015-12-16T15:19:17.924603Z │ 1334            │ 1341             │ 1400                 │ 1489                   │
├──────────────┼────────────────┼─────────────────────────────┼─────────────────────────────┼─────────────────┼──────────────────┼──────────────────────┼────────────────────────┤
...
```

## Generate single
Make a single handwriting image with text specified in the command line.

```
dominick:$ node src/js/interface.js --api_key=YOUR_API_KEY --api_secret=YOUR_API_SECRET --action=generate-single  --handwriting_id=7EQMJPSG00H9 --type=png --text="Hello world" --output_file="output/example.pdf"

output/example.pdf saved.

```

## Generate list
Generate many handwriting images with the use of a spreadsheet. Your spreadsheet may only have one sheet and will throw an error if a workbook with multiple tabs is input. You also have to enter the name of the column which will be used for the text. Lastly, you have to select the column that will be the name of the output file (without the file extension).

```
dominick:$ node src/js/interface.js --api_key=YOUR_API_KEY --api_secret=YOUR_API_SECRET --action=generate-list  --handwriting_id=7EQMJPSG00H9 --sheet="/var/Samples/handwriting_sample.csv" --text_column=Text  --output_dir="output/" --output_column=Filename --type=pdf

output/1GabrielPeluso.pdf saved.
output/2SamMunroe.pdf saved.
output/3JohnDoe.pdf saved.
...
All files have been processed successfully

```
