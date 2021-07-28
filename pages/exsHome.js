

  changeListOfNavPages = () => {
    let todos = this.choosedTodoList();
    let counterOfList = (Math.trunc(todos.length / this.filterValue) + 1);

    if (todos.length % this.filterValue === 0 && counterOfList !== 1) {
      counterOfList--;
    }

    this.navListCounter = counterOfList;
    this.moveToTheNavPage(this.navListCounter);
  }

  moveToTheNavPage = (index) => {
    let todos = this.choosedTodoList();
    if (todos.length < (this.navListCounter * this.filterValue) && this.navListCounter !== 1 && todos.length % this.filterValue === 0) {
      this.navListCounter--;
    }

    if (index > this.navListCounter) {
      this.prevChoosedNav = this.navListCounter;
    } else {
      this.prevChoosedNav = index;
    }
    
    this.setState({
      todoList: todos,
      choosedNav: this.prevChoosedNav,
      navListCounter: this.navListCounter
    });
  }


 



