import React,{ useState, useEffect,useCallback } from 'react';
import { View,Text,StyleSheet, Switch} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {useDispatch} from 'react-redux'

import HeaderButton from '../components/HeaderButton'
import Colors from '../constants/Colors'
import { serFilters } from '../store/actions/meals'

const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.lable}</Text>
            <Switch 
            trackColor={{true : Colors.primaryColor }}
            thumbColor={Colors.accenttColor}
            value={props.state} 
            onValueChange={props.onChange}/>
        </View>
    )
};

const FiltersScreen = props => {
    const { navigation } = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegeterian, setIsVegeterian] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const appliedFilters ={
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan:isVegan,
            vegetarian:isVegeterian
        };
        dispatch(serFilters(appliedFilters));
    },[isGlutenFree,isLactoseFree,isVegan,isVegeterian]);

    useEffect(() => {
        navigation.setParams({save :saveFilters});
    },[saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters</Text>
            <FilterSwitch
            lable='Gluten Free'
            state={isGlutenFree}
            onChange={newValue => setIsGlutenFree(newValue)} 
            />
            <FilterSwitch
            lable='Lactose-Free'
            state={isLactoseFree}
            onChange={newValue => setIsLactoseFree(newValue)} 
            />
            <FilterSwitch
            lable='Vegan'
            state={isVegan}
            onChange={newValue => setIsVegan(newValue)} 
            />
            <FilterSwitch
            lable='Vegeterian'
            state={isVegeterian}
            onChange={newValue => setIsVegeterian(newValue)} 
            />
        </View>
    );
};

FiltersScreen.navigationOptions = (navData) => {
    return { headerTitle:'Filter Meals',
     headerLeft : () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
             <Item 
                    title="Menu" 
                    iconName="ios-menu" 
                    onPress={() => {
                        navData.navigation.toggleDrawer();
             }}/>
      </HeaderButtons>),
    headerRight:() => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
             <Item 
                    title="Save" 
                    iconName="ios-save" 
                    onPress={navData.navigation.getParam('save')}/>
      </HeaderButtons>),
                  };
    
 };

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignContent:'center',
        marginLeft:30,
        padding:45
    },
    filterContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center', 
        width:'80%',
        marginVertical:15,
    },
    title:{
        fontFamily:'open-sans-bold',
        fontSize:22,
        margin:20,
        textAlign:'center',
        paddingRight:45,
    },
})

export default FiltersScreen;