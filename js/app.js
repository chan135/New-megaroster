$(document).foundation()

const megaroster = {
  students: [],

  init(listSelector) {
    this.studentList = document.querySelector(listSelector)
    this.max = 0
    this.setupEventListeners()  
  },

  setupEventListeners() {
    document
      .querySelector('#new-student')
      .addEventListener('submit', this.addStudent.bind(this))
  },

  removeStudent(ev) {
    const btn = ev.target
    btn.closest('.student').remove()
    const stu = ev.target.parentNode.parentNode.dataset.id
    megaroster.students.splice(stu -1, 1)
    for (let a = stu -1; a < megaroster.students.length; a++) {
      megaroster.students[a].id -= 1
    }
    //console.log(ev)
    // Remove it from the this.students array
    // this.students.splice(?, 1)
  },

  promoteStudent(ev) {
    const stu = ev.target.parentNode.parentNode
    let colors = "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16)
    stu.style.border = "thick solid " + colors
    
  },

  addStudent(ev) {
    ev.preventDefault()
    const f = ev.target
    const student = {
      id: this.max + 1,
      name: f.studentName.value,
    }
    this.students.push(student)

    const listItem = this.buildListItem(student)
    this.prependChild(this.studentList, listItem)

    this.max ++
    f.reset()
  },

  prependChild(parent, child) {
    parent.insertBefore(child, parent.firstChild)
  },

  buildListItem(student) {
    const template = document.querySelector('.student.template')
    const li = template.cloneNode(true)
    this.removeClassName(li, 'template')
    li.querySelector('.student-name').textContent = student.name
    li.dataset.id = student.id

    li
      .querySelector('button.remove')
      .addEventListener('click', this.removeStudent.bind(this))

    li
      .querySelector('button.promote')
      .addEventListener('click', this.promoteStudent.bind(this))

    return li
  },

  removeClassName(el, className){
    el.className = el.className.replace(className, '').trim()
  }
}
megaroster.init('#studentList')
