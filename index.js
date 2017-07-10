import getParameter from 'get-parameter'
import template from '@/template.html'
import sidebar from '@/sidebar.html'

import main from '@/styles/main.scss'
import fontAwesome from "font-awesome-webpack"
import mugshot from "@/images/mugshot.jpg"

import openSans from "@/fonts/OpenSans-Regular.ttf"
import moment from "moment"
import Handlebars from "handlebars"

import conf from "@/conf/properties.yaml"
import { range } from "lodash"


const locale = getParameter("lang") || "pl"

const data = require(`@/${locale}/data.yaml`)
const messages = require(`@/${locale}/messages.yaml`)

moment.locale(locale)


Handlebars.registerHelper('formatDate', function(value) {
  return moment(value, "DD.MM.YYYY").format("D MMMM YYYY")
})

Handlebars.registerHelper('formatDateShort', function(value) {
  return moment(value, "DD.MM.YYYY").format("MMMM YYYY")
})

Handlebars.registerHelper('times', function(n, block) {
    return range(n).map (i => {
        block.data.index = i
        block.data.first = i === 0
        block.data.last = i === (n - 1)
        return block.fn(this)
    })
})

Handlebars.registerHelper('rating', function(n) {
    return range(conf.maximum_rating).map(i =>
      (i <= n) ? "<i class='fa fa-star'></i>" : "<i class='fa fa-star-o'></i>"
    ).join(" ")
})

Handlebars.registerPartial('sidebar', sidebar)

const model = {
  mugshot,
  data,
  messages
}

const main = document.createElement("main")
main.innerHTML = template(model)
document.querySelector("body").appendChild(main)
