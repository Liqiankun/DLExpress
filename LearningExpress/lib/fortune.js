var fortunes = [
  'Conquer your fears or they will conquer you.',
  'River need spring.',
  'Do not fear what you do n ot know',
  'You will have a plesant surprise',
  'Whenever possible, keep it simple'
]

exports.getFortune = function(){
  var idx = Math.floor(Math.random() * fortunes.length)
  return fortunes[idx]
}
