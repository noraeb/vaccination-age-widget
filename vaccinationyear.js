// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: magic;
async function getYearStatus(year) {
  const url = `https://user-api.coronatest.nl/vaccinatie/programma/bepaalbaar/${year}/NEE/NEE`;
  const req = new Request(url);
  const json = await req.loadJSON();
  if (json.success) {
    return json.success;
  }
  return false;
}

async function getYearOfBirth() {
  let year = 2002;
  let stop = false;

  while (!stop) {
    const success = await getYearStatus(year);
    if (year < 1978) {
      return "Something went wrong";
    }
    if (success) {
      stop = true;
      return year;
    }
    year--;
  }
}

const result = await getYearOfBirth();

let w = new ListWidget();
let nextRefresh = Date.now() + 1000 * 60;

w.refreshAfterDate = new Date(nextRefresh);

let dfDate = new DateFormatter();
let dfTime = new DateFormatter();
dfDate.useShortDateStyle();
dfTime.useMediumTimeStyle();

const date = dfDate.string(new Date());
const time = dfTime.string(new Date());

w.backgroundColor = new Color("#ffb512");
t = w.addText(`${result}💉`);
t.textColor = Color.white();
t.font = new Font("Avenir-Medium ", 32);

s = w.addText(`${date} ${time}`);
s.textColor = Color.white();
s.font = new Font("Avenir-Heavy", 12);

Script.setWidget(w);
Script.complete();
