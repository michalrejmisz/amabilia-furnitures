import {Fragment, useState} from 'react';
import {
  Button,
  useMantineTheme,
} from '@mantine/core';



interface ButtonColorProps{
  themeColor: string;
}

const ButtonColor = ({themeColor} : ButtonColorProps) => {
  const theme = useMantineTheme()
  const [color, setColor] = useState('blue');


  const ButtonHandle = () => {
      const cutColor = themeColor.split('.')[0]
      setColor(cutColor)
      theme.primaryColor = color;
      console.log(color);
  }

  return(
      <Button color={themeColor} onClick={ButtonHandle}></Button>
  )
};

export const ThemeColor = () => {
  const {colors} = useMantineTheme()
  return(
      <Fragment>
          <ButtonColor themeColor={'dark.6'}/>
          <ButtonColor themeColor={'gray.6'}/>
          <ButtonColor themeColor={'red.6'}/>
          <ButtonColor themeColor={'pink.6'}/>
          <ButtonColor themeColor={'grape.6'}/>
          <ButtonColor themeColor={'violet.6'}/>
          <ButtonColor themeColor={'indigo.6'}/>
          <ButtonColor themeColor={'blue.6'}/>
          <ButtonColor themeColor={'cyan.6'}/>
          <ButtonColor themeColor={'teal.6'}/>
          <ButtonColor themeColor={'green.6'}/>
          <ButtonColor themeColor={'lime.6'}/>
          <ButtonColor themeColor={'yellow.6'}/>
          <ButtonColor themeColor={'orange.6'}/>
      </Fragment>
  );
};