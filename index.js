import getParameter from 'get-parameter';
import template from '@/template.html'
import main from '@/styles/main.scss'
import fontAwesome from "font-awesome-webpack"
import mugshot from "@/images/mugshot.jpg"

import openSans from "@/fonts/OpenSans-Regular.ttf"
import moment from "moment"
import Handlebars from "handlebars"


const locale = getParameter("lang") || "pl"

const data = require(`@/${locale}/data.yaml`)
const messages = require(`@/${locale}/messages.yaml`)

moment.locale(locale)


Handlebars.registerHelper('formatDate', function(value) {
  return moment(value, "DD.MM.YYYY").format("D MMMM YYYY")
});

Handlebars.registerHelper('formatDateShort', function(value) {
  return moment(value, "DD.MM.YYYY").format("MMMM YYYY")
});

const model = {
  mugshot,
  data,
  messages
}

const main = document.createElement("main")
main.innerHTML = template(model)
document.querySelector("body").appendChild(main)
