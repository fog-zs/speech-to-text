import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, createTheme, ThemeProvider, Button, CssBaseline, FormControlLabel, Checkbox } from "@mui/material"
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import SEO from "../components/seo"
import { FaGithub } from 'react-icons/fa';
import SpeechRecognitionComponent from '../components/SpeechRecognitionComponent';

// JSONファイルの読み込み
import languages from '../data/languages.json';

// Light用のテーマ
const lightTheme = createTheme();

// Dark用のテーマ
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const IndexPage: React.FC<PageProps> = () => {
  const [logText, setLogText] = React.useState<string>("")
  const [text, setText] = React.useState<string>("")
  const [lang, setLang] = React.useState('zh-CN')
  const [toggle, setToggle] = React.useState(true)
  const [darkMode, setDarkMode] = React.useState(true);
  const [checkboxChecked, setCheckboxChecked] = React.useState(false);
  const textEndRef = React.useRef<HTMLDivElement | null>(null);
  const [textLength, setTextLength] = React.useState(0);

  const setResultText = (newText: string) => {
    console.log(newText);
    if (checkboxChecked === true) {
      if (newText.length < textLength) {
        setLogText(logText + text + '\n');
      }
      setTextLength(newText.length);
    }

    setText(newText);
  }

  // ダークモード切り替え
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleChangeLang = (event: SelectChangeEvent) => {
    setLang(event.target.value as string);
  };

  const handleChangeToggle = () => {
    setToggle(!toggle);
  };

  const handleCheckboxChange = () => {
    if (checkboxChecked === true) {
      setLogText("");
    }
    setCheckboxChecked(!checkboxChecked);
  };

  // Scroll to bottom when text or logText is updated
  React.useEffect(() => {
    if (textEndRef.current) {
      textEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [text, logText]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <SEO title="Speech to Text" description="音声をテキストに変換" />
      <CssBaseline />
      <Container maxWidth="sm" sx={{ pt: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <FormControl size="small" fullWidth>
              <InputLabel id="demo-simple-select-label">語言</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={lang}
                label="Language"
                onChange={handleChangeLang}
              >
                {languages.map(language => (
                  <MenuItem key={language.code} value={language.code}>
                    {language.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <IconButton onClick={toggleDarkMode} aria-label="Toggle dark mode">
              {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton component="a" href="https://github.com/fog-zs/speech-to-text" aria-label="GitHub link" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </IconButton>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkboxChecked}
                  onChange={handleCheckboxChange}
                  name="featureCheckbox"
                />
              }
              label="Log"
            />
          </Grid>
          <Grid item>
            <Button onClick={handleChangeToggle} variant="contained">
              {!toggle ? '開始' : '停止'}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <div>{logText}{text}</div>
            <div ref={textEndRef} />
          </Grid>
        </Grid>
        <SpeechRecognitionComponent lang={lang} toggle={toggle} setText={setResultText} />
      </Container>
    </ThemeProvider>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Speech to Text</title>
