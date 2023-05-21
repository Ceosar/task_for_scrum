# task_for_scrum

## confirmChoosing()
  Функция вызывается при нажатии на кнопку "Press to confirm". Блок с выбором скрывается. Переменные, заполненные пользователем в <select>, сравниваются.
  - При их равенстве появляется блок с итоговым результатом и вызывается функция saveSelectOption().
  - Иначе, появляется блок с промежуточными результатами, и вызываются функции saveSelectOption() и showComments(arg1, arg2, arg3).
  
## saveSelectOption()
  Функция вызывается в confirmChoosing(). Задача saveSelectOption() взять из каждого <select> значения и сохранить их в localStorage.
  
## showComments(arg1, arg2, arg3)
  Функция вызывается в confirmChoosing(). Задача showComments(arg1, arg2, arg3) получить оценку и комментарии пользователя. Затем вывести их на экран в блок с промежуточными результатами.
  
## loadOptions()
  Функция вызывается при загрузке страницы. loadOptions() берет переменные из localStorage и присваивает каждому <select> по отдельности.
  Array.from() используется для преобразования коллекции selectGreen.options в метод find(), который возвращает первый элемент, устанавливающий условие, указанное в коллбэк-функциях.
  Внутри коллбэк-функции сравнивается значение каждого <option> с уже существующими переменными из localStorage.
  
## tryAgainFun()
  Функция вызывается при нажатии на кнопки "Next" и "Try Again" в блоках с итоговым и промежуточным результатами соответственно.
