function set42(key) {
  eval(`${key} = 42;`)
}

set42('let i=0;while(true)i++;const pass')