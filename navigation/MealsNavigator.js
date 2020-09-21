import React from 'react';
import {Platform,Text} from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import { createAppContainer } from "react-navigation";
import {Ionicons} from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import {createDrawerNavigator} from 'react-navigation-drawer';


import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../constants/Colors';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen'

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
  },
  headerTitleStyle:{
    fontFamily:'open-sans-bold'
  },
  headerBackTitleStyle:{
    fontFamily:'open-sans'
  },
  headerTintColor:
    Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  headerTitle: 'A Screen'
}

const MealsNavigator = createStackNavigator(
    {
      Categories: {
        screen: CategoriesScreen
      },
      CategoryMeals: {
        screen: CategoryMealsScreen
      },
      MealDetails: MealDetailScreen
    },
    {
      // initialRouteName: 'Categories',
      defaultNavigationOptions: defaultStackNavOptions
    }
  );
  
  const FavNavigator =  createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetails : MealDetailScreen
  },{
    defaultNavigationOptions: defaultStackNavOptions
  });

  const tabScreenConfig = {
    Meals: {
      screen: MealsNavigator,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return (
            <Ionicons name="ios-restaurant" 
            size={25} 
            color='#fa4252' />
          );
        },
        tabBarColor: '#2d4059',
        tabBarLabel: Platform.OS === 'android' ?
        <Text style={{fontFamily:'open-sans-bold'}}>Meals</Text> : "Meals"
      }
    },
    Favorites: {
      screen: FavNavigator,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return <Ionicons name="ios-star" size={25} color='gold' />;
        },
        tabBarColor: '#16213e',
        tabBarLabel: Platform.OS === 'android' ?
        <Text style={{fontFamily:'open-sans-bold'}}>Favorites</Text> : "Favorites"
      
       
      }
    }
  };
  
  const MealsFavTabNavigator =
    Platform.OS === 'android'
      ? createMaterialBottomTabNavigator(tabScreenConfig, {
          activeTintColor: 'white',
          shifting: true,
          barStyle: {
            backgroundColor: Colors.primaryColor
          },

        })
      : createBottomTabNavigator(tabScreenConfig, {
          tabBarOptions: {  
            labelStyle:{
                fontFamily:'open-sans-bold'
            },
            activeTintColor: 'Colors.accentColor'
          }
        });

     const FiltersNavigator = createStackNavigator({
       Filters : FiltersScreen
     }, {
      defaultNavigationOptions: defaultStackNavOptions
    });

      const MainNavigator = createDrawerNavigator({

        MealsFavs:{screen : MealsFavTabNavigator , navigationOptions:{
          drawerLabel:"Meals",
          

        }},
        Filters: FiltersNavigator
      },{
        contentOptions:{
          activeTintColor: Colors.accenttColor,
          labelStyle: {
            fontSize:18,
            fontFamily:'open-sans-bold',
            textAlign :'right'
          }
        }
      });
  
  export default createAppContainer(MainNavigator);
  