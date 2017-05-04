import template from '@/template.html'
import main from '@/styles/main.scss'
import fontAwesome from "font-awesome-webpack"


document.querySelector("main").innerHTML = template({msg: "Witaj"})
