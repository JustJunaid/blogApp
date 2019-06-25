import React, {useState} from 'react';
import { makeStyles, WithStyles } from '@material-ui/core/styles';
import {GridList, GridListTile, Button, GridListTileBar} from '@material-ui/core';

const categories = [
  {
    Technology: ['this', 'another']
  },
  {
    Fashion: ['as', 'dfd']
  },
  {
    DEve: ['sd', 'lkj']
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
    height: '80vh',
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

  const [selectedCategory, setSelectedCategory] = useState('')
  const [subCategories, setSubCategories] = useState([])

  const selectCategory = (e) => {
    console.log(e.currentTarget.value)
    setSelectedCategory(selectedCategory)
    categories.map((category, i) => {
      if (Object.keys(category)[0] === e.currentTarget.value) setSubCategories(Object.values(category))
    })
    console.log(subCategories)
    return
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
          {subCategories.map((subCategory, i) => (
            <GridListTile key={i}>
              <GridListTileBar
                title={subCategory[i]}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
}