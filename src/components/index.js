import styled from 'styled-components/native'
import { 
    Title as TitlePaper, 
    Text as TextPaper,
    Button as ButtonPaper,
    TextInput as TextInputPaper,
    ActivityIndicator as ActivityIndicatorPaper,
    Badge as BadgePaper,
    ProgressBar as ProgressBarPaper

} from 'react-native-paper'

import { LinearGradient } from 'expo-linear-gradient'
import { ProgressCircle as ProgressCircleSVG } from 'react-native-svg-charts'

import utils from '../utils'

export const Box = styled.View`
    flex: 1;
    flex-wrap: ${(props) => props.wrap || 'nowrap'};
    flex-direction: ${(props) => (props.row ? 'row' : 'column')};
    justify-content: ${(props) => props.justify || 'flex-start'};
    align-items: ${(props) => props.align || 'flex-start'};

    width: ${(props) => props.width || '100%'};
    max-width: ${(props) => props.width || '100%'};
    height: ${(props) => props.height || 'auto'};
    max-height: ${(props) => props.height || 'auto'};

    padding: ${(props) => (props.hasPadding ? '20px' : '10px')};
    padding-top: ${(props) => props.removePaddingTop ? '0' : props.hasPadding ? '20px' : '0px'};
    padding-bottom: ${(props) => props.removePaddingBottom ? '0' : props.hasPadding ? '20px' : '0px'};
    margin: ${(props) => props.spacing || 0};

    border-radius: ${(props) => (props.radius ? '5px' : '0px')};
    border: ${(props) => props.border || 'none'};
    background: ${(props) => props.theme[props.background] || props.background || 'transparent'};
`;

export const ScrollView = styled.ScrollView`
    width: ${(props) => props.width || '100%'};
    background: ${(props) => props.theme[props.background] || props.background || 'transparent'};


`;

export const Title = styled(TitlePaper)`
    color: ${(props) => props.theme[props.color || 'dark']};

    font-size: ${(props) => (props.small ? '22px' : props.big ? '50px' : '30px')};
    padding: ${(props) => (props.hasPadding ? '20px' : '0px')};

    letter-spacing: -0.8px;
    font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
    line-height: ${(props) => props.small ? '22px' : props.big ? '50px' : '30px'};
    text-align: ${(props) => props.align || 'left'};

    transform: ${(props) => (props.scale ? `scale(${props.scale})` : '')};
    font-family: 'Ubuntu_700Bold';
`;

export const Spacer = styled.View`
    width: 100%;
    height: ${props => props.size ?? '10px'};
`;

export const Cover = styled.ImageBackground.attrs((props) =>
  props.image
    ? {
        source: { uri: props.image },
      }
    : undefined
)`
  width: ${(props) => props.width || '100px'};
  height: ${(props) => props.height || '100px'};
  margin: ${(props) => props.spacing || '0px'};
  border-radius: ${(props) => (props.circle ? props.width : '3px')};
  border: ${(props) => props.border || 'none'};
  overflow: hidden;

  /* background-color: ${({ theme, transparent }) => transparent ? 'transparent' : theme.muted}; */

`;

export const Text = styled(TextPaper)`
    color: ${(props) => props.theme[props.color || 'muted']};
    font-size: ${(props) => (props.small ? '13px' : '17px')};
    font-family: ${(props) => props.bold ? 'Ubuntu_700Bold' : 'Ubuntu_300Light'};
    margin: ${(props) => props.spacing || 0};
    padding: ${(props) => (props.hasPadding ? '20px' : '0px')};
    line-height: ${(props) => (props.small ? '13px' : '20px')};
    text-decoration: ${(props) => (props.underline ? 'underline' : 'none')};
    opacity: 0.7;
    text-align: ${(props) => props.align || 'left'};
`;

export const Button = styled(ButtonPaper).attrs(props => ({
    color: props.theme[props.background] || props.background || props.theme.primary,
    width: props.block ? '100%' : 'auto',
    uppercase: false,
    labelStyle: {
        color: props.theme[props.textColor || 'light'],
        letterSpacing: 0,
        fontFamily: 'Ubuntu_400Regular'
    },
    mode: props.mode ? props.mode : 'contained'
}))`
    padding: ${(props) => props.padding || '10px'};
`;

export const Input = styled(TextInputPaper).attrs(({theme}) => ({
    mode: 'outlined',
    outlineColor: theme.muted,
    underlineColor: theme.muted,
    selectionColor: theme.muted,
    theme: {
        colors: {
            background: theme.dark,
            placeholder: theme.muted,
            primary: theme.light,
            text: theme.light
        }
    }

}))`
    height: 45px;
    width: 100%;
    font-size: 16px;
`;

export const GradientView = styled(LinearGradient)`
    flex: 1;
    padding: ${(props) => (props.hasPadding ? '20px' : '10px')};
    justify-content: ${props => props.justify || 'flex-start'};
    align-items: ${props => props.align || 'flex-start'};
    height: 400;
`;

export const ProgressCircle = styled(ProgressCircleSVG).attrs(props => ({
    progressColor: props.theme[props.color] || props.theme.warning,
    backgroundColor: props.theme[props.background] || props.theme.secodary
    
}))`
    width: ${props => props.size || '120px'};
    height: ${props => props.size || '120px'};
    position: absolute;

`;

export const Touchable = styled.TouchableOpacity`
    flex: 1;
    flex-wrap: ${(props) => props.wrap || 'nowrap'};
    flex-direction: ${(props) => (props.row ? 'row' : 'column')};
    justify-content: ${(props) => props.justify || 'flex-start'};
    align-items: ${(props) => props.align || 'flex-start'};

    width: ${(props) => props.width || '100%'};
    max-width: ${(props) => props.width || '100%'};
    height: ${(props) => props.height || 'auto'};
    max-height: ${(props) => props.height || 'auto'};

    padding: ${(props) => (props.hasPadding ? '20px' : '10px')};
    padding-top: ${(props) => props.removePaddingTop ? '0' : props.hasPadding ? '20px' : '0px'};
    padding-bottom: ${(props) => props.removePaddingBottom ? '0' : props.hasPadding ? '20px' : '0px'};
    margin: ${(props) => props.spacing || 0};

    border-radius: ${(props) => (props.radius ? '5px' : '0px')};
    border: ${(props) => props.border || 'none'};
    background: ${(props) => props.theme[props.background] || props.background || 'transparent'};

`;

export const ActivityIndicator = styled(ActivityIndicatorPaper).attrs(props => ({
    animating: true,
    color: props.theme[props.color || 'primary']
}))``;

export const FlatList = styled.FlatList`
    width: 100%;
`;

export const Badge = styled(BadgePaper).attrs(props => ({}))`
    width: auto;
    height: auto;
    align-self: center;
    font-size: ${props => (props.big ? '16px' : '12px')};
    padding: ${props => (props.big ? '6px 10px' : '2px 5px')};
    line-height: 20px;
    margin: ${props => (props.spacing || 0)};
    border-radius: ${props => (props.radius || '10px')};
    color: ${props => props.theme[props.color || 'danger']};
    background: ${props => utils.toAlpha(props.theme[props.color || 'danger'], 20)};

`;

export const ProgressBar = styled(ProgressBarPaper).attrs(props => ({
    color: props.theme[props.color || 'primary']    
}))`
    width: ${props => props.width ?? '100px'};
    height: 10px;
    border-radius: 10px;
    background: ${props => utils.toAlpha(props.theme.light, 20)};
`;



// export const Badge = styled(BadgePaper).attrs(props => ({}))``;
