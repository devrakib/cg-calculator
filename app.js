// Storage Controller


// Item Controller
const ItemCtrl = (function(){
  // Item Constructor
  const Item = function(id, course, credit, grad){
    this.id = id;
    this.course = course;
    this.credit = credit;
    this.grad = grad;
  }

  // Data Structure / State
  const data = {
    items: [
      // {id: 0, name: 'Steak Dinner', calories: 1200},
      // {id: 1, name: 'Cookie', calories: 400},
      // {id: 2, name: 'Eggs', calories: 300}
    ],
    currentItem: null,
    totalCgpa: 0
  }

  // Public methods
  return {
    getItems: function(){
      return data.items;
    },
    addItem: function(course, credit, grad){
      let ID;
      // Create ID
      if(data.items.length > 0){
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Credit to number
      credit = parseInt(credit);
      // grad to number
      grad = parseInt(grad);
      // Create new item
      newItem = new Item(ID, course, credit, grad);

      // Add to items array
      data.items.push(newItem);

      return newItem;
    },
    logData: function(){
      return data;
    }
  }
})();



// UI Controller
const UICtrl = (function(){
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemCourse: '#item-course',
    itemCredit: '#item-credit',
    itemgrad: '#item-grad'
  }
  
  // Public methods
  return {
    populateItemList: function(items){
      let html = '';

      items.forEach(function(item){
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.course}: </strong> <em>${item.credit} </em><em>${item.grad}</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`;
      });

      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function(){
      return {
        course:document.querySelector(UISelectors.itemCourse).value,
        credit:document.querySelector(UISelectors.itemCredit).value,
        grad:document.querySelector(UISelectors.itemgrad).value
      }
    },
    addListItem: function(item){
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      // Add ID
      li.id = `item-${item.id}`;
      // Add HTML
      li.innerHTML = `<strong>${item.course}: </strong> <em>${item.credit} </em><em>${item.grad}</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
      // Insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
    },
    clearInput: function(){
      document.querySelector(UISelectors.itemCourse).value = '';
      document.querySelector(UISelectors.itemCredit).value = '';
      document.querySelector(UISelectors.itemgrad).value = '';
    },
    hideList: function(){
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    getSelectors: function(){
      return UISelectors;
    }
  }
})();



// App Controller
const App = (function(ItemCtrl, UICtrl){
  // Load event listeners
  const loadEventListeners = function(){
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
  }

  // Add item submit
  const itemAddSubmit = function(e){
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();

    // Check for name and calorie input
    if(input.course !== '' && input.credit !== '' && input.grad !== ''){
      // Add item
      const newItem = ItemCtrl.addItem(input.course, input.credit, input.grad);

      // Add item to UI list
      UICtrl.addListItem(newItem);

      // Clear fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  }

  // Public methods
  return {
    init: function(){
      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Check if any items
      if(items.length === 0){
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items);
      }

      // Load event listeners
      loadEventListeners();
    }
  }
  
})(ItemCtrl, UICtrl);

// Initialize App
App.init();