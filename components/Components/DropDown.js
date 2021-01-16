import React from 'react'

export default function DropDown({ placeholderText, pickerItems, defaultOption, onChangeItem }) {

    const DropDownBig = () => {
        return (
            <DropDownPicker
                placeholder={placeholderText}
                labelStyle={{fontSize: 24, color: 'black', padding: 10}}
                items={pickerItems}
                itemStyle={{justifyContent: 'flex-start'}}
                defaultIndex={0}
                dropDownMaxHeight={375}
                dropDownStyle={{backgroundColor: '#f8f8ff'}}
                containerStyle={{
                    height: 100, 
                    width: 360, 
                    shadowColor: 'black',
                    shadowOpacity: 0.4,
                    shadowOffset: {width: 1, height: 1}
                }}
                onChangeItem={onChangeItem}
            />
        )
    }

    const DropDownMedium = () => {
        return (
            <DropDownPicker
                placeholder={placeholderText}
                labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                items={pickerItems}
                defaultValue={defaultOption}
                dropDownMaxHeight={172}
                dropDownStyle={{backgroundColor: '#f8f8ff'}}
                containerStyle={{
                    height: 80, 
                    width: 115, 
                    margin: 2.5, 
                    shadowColor: 'black',
                    shadowOpacity: 0.2,
                    shadowOffset: {width: 1, height: 1}
                }}
                onChangeItem={onChangeItem}
            />
        )
    }

    const DropDownTiny = () => {
        return (
            <DropDownPicker
                placeholder={placeholderText}
                labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                items={pickerItems}
                defaultValue={defaultOption}
                dropDownMaxHeight={172}
                dropDownStyle={{backgroundColor: '#f8f8ff'}}
                containerStyle={{
                    height: 80, 
                    width: 115, 
                    margin: 2.5, 
                    shadowColor: 'black',
                    shadowOpacity: 0.2,
                    shadowOffset: {width: 1, height: 1}
                }}
                onChangeItem={onChangeItem}
            />
        )
    }
}
