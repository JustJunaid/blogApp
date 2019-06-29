import React, {useState} from 'react';
import { makeStyles, WithStyles } from '@material-ui/core/styles';
import {GridList, GridListTile, Button, GridListTileBar} from '@material-ui/core';

const categories = [
  {
    Technology: ['this', 'another', 'junaid', 'deep', 'rohit', 'rohan', 'shail', 'manu']
  },
  {
    Fashion: ['as', 'dfd']
  },
  {
    DEve: ['sd', 'lkj', 'sd', 'lkj']
  }
]

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridListCategories: {
    flexWrap: 'nowrap',
    marginTop: '20px !important',
    height: '60px',
  },
  gridListSubCategories: {
    width: '100%',
    height: '75vh',
    marginTop: '30px !important'
  },
  title: {
    color: theme.palette.primary.light,
  },
  button: {
    backgroundColor: '#c2c2c2'
  }
}));

export default function SingleLineGridList() {
  const classes = useStyles();

  const [selectedCategory, setSelectedCategory] = useState(Object.keys(categories[0])[0])
  const [selectedSubCat, setSelectedSubCat] = useState([])
  const [subCategories, setSubCategories] = useState(Object.values(categories[0]))

  const selectCategory = (e) => {
    setSelectedCategory(e.currentTarget.value)
    categories.map( category => {
      if (Object.keys(category)[0] === e.currentTarget.value) setSubCategories(Object.values(category))
    })
  }

  const selectSubCategory = (e) => {
    const currentValue = e.currentTarget.innerText
    // const index = selectedSubCat.indexOf(currentValue)
    // if (index >= 0) {
    //   // const chunked = subCategories.filter(currentValue => selectedSubCat.indexOf(currentValue) < 0)
    //   // console.log(chunked)
    //   selectedSubCat.splice(index, 1)
    // } else {
    //   [...selectedSubCat, currentValue]
    // }
    // setSelectedSubCat(selectedSubCat, () => console.log(selectedSubCat))
  }

  return (
    <div>
      <div className={classes.root}>
        <GridList className={classes.gridListCategories}>
          {categories.map((category, i) => (
            <GridListTile style={{height: '60px', width: 'fit-content'}} key={i}>
              <Button color="primary" key={i} value={Object.keys(category)} className={classes.button} onClick={selectCategory}>
                {Object.keys(category)}
              </Button>
            </GridListTile>
          ))}
        </GridList>
      </div>
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridListSubCategories}>
          {subCategories[0].map((subCategory, i) => (
            <GridListTile key={i} style={{cursor: 'pointer'}} value={subCategory} onClick={selectSubCategory}>
              <GridListTileBar
                title={subCategory}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
      <div className={classes.root}>
        <GridList className={classes.gridListCategories}>
          {selectedSubCat.map((subCat, i) => (
            <GridListTile style={{height: '60px', width: 'fit-content'}} key={i}>
              <Button color="primary" key={i} value={subCat} className={classes.button}>
                {subCat}
              </Button>
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
}