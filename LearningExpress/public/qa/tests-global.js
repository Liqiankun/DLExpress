suite('Global Tests', function(){
  test('page has a valid title', function(){
    assert(document.title && document.title.match(/\s/) && document.title.toUpperCase() !== 'TODO')
  })
})
