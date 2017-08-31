const fi = (function() {
  function each(list, callback) {
      if (Array.isArray(list)) {
        for (let i = 0; i < list.length; i++) {
          callback(list[i], i, list)
        }}
        else {
          for (let key in list) {
            callback(list[key], key, list)
          }
        }
        return list;
      }

  function filter(array, callback) {
      let newArray = [];
      each(array, function(element) {
        if (callback(element)) {
          newArray.push(element)
        }
      });
      return newArray;
    }

  return {
      each: each,
      filter: filter,
      map: function (list, callback) {
      let newArray = [];
        each(list, function(element) {
          newArray.push(callback(element))
        })
        return newArray;
      },
      reduce: function(list, callback, startValue) {
        var newList = list
        var startValue = startValue
        if (!startValue) {
          if (Array.isArray(newList)){
            startValue = newList.shift()
          } else {
            let keys = Object.keys(newList)
            let firstKey = keys[0]
            startValue = newList[firstKey]
            delete newList[firstKey]
          }
        };
        let finalValue = startValue;
        each(newList, function(element) {
          finalValue = (callback(finalValue, element))
        })
        
        return finalValue;
      },
          find: function(list, callback) {
          if (Array.isArray(list)) {
          for (let i = 0; i < list.length; i++) {
            if (callback(list[i])) return list[i]
          }} else {
            for (key in list) {
              if (callback(list[key])) return list[key]
            }
          }
        },
          sortBy: function(list, callback) {
            let finalList = [];
            let newObj = {};

            if (typeof callback === 'string') {
              let term = callback
              callback = function (element) {return element[term]}
            }
            for (let i = 0; i < list.length; i++) {
              newObj[callback(list[i])] = i
            }
            let keys = Object.keys(newObj).sort()
            for (let i = 0; i < keys.length; i++) {
              finalList.push(list[newObj[keys[i]]])
            }
            return finalList
        },
          size: function(list) {
            let counter = 0;
            each(list, function () { counter += 1; })
            return counter
          },
          first: function(list, n) {
            if (!n) { return list.slice(0,1)[0] }
            else { return list.slice(0,n) }
          },
          last: function(list, n) {
            if (!n) { return list.slice(list.length-1,list.length)[0]}
            else { return list.slice(list.length-n, list.length) }
          },
          compact: function(array) {
            return filter(array, function(el) { return !!el })
          },
          uniq: function(array, isSorted, callback) {
            let finalArray = [];
            if (!callback) {
              callback = function(el) { return el }
            }
            if (isSorted) {
              for (let i = 0; i < array.length; i++) {
                if (callback(array[i]) !== callback(finalArray[finalArray.length-1])) {
                  finalArray.push(array[i])
                }
              }} else {
                for (let i = 0; i < array.length; i++) {
                  if (!finalArray.includes(callback(array[i]))) {
                    finalArray.push(callback(array[i]))
                  }
                }
              }
            return finalArray;
          },
          keys: function(object) {
            let array = [];
            for (key in object) { array.push(key) }
            return array
          },
          values: function(object) {
            let array = [];
            for (key in object) { array.push(object[key]) }
            return array
          },
          functions: function(obj) {
            let finalArray = [];
            let properties = Object.getOwnPropertyNames(obj)
            for (let i = 0; i < properties.length; i++) {
              if (typeof obj[properties[i]] === "function") {
                finalArray.push(properties[i])
              }
            }
            return finalArray.sort()
          },
          flatten: function(array, shallow) {
            let finalArray = [];
            function dig (src, dest) {
              if (!Array.isArray(src)) {
                dest.push(src);
              } else {
                for (i = 0; i < src.length; i++) {
                  dig(src[i], dest)
                }
              }
            }
            if (!shallow) {
              dig(array, finalArray)
            } else {
              for (let i = 0; i < array.length; i++) {
                if (Array.isArray(array[i])) {
                  for (let j = 0; j < array[i].length; j++) {
                    finalArray.push(array[i][j])
                  }
                } else {
                  finalArray.push(array[i])
                }}
            }
            return finalArray;
          },
          bind: function(func, obj, arg) {
            obj.func = func
            return function () { return obj.func(arg)}
            }
          }
        })()