import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, createTheme, ThemeProvider, Button, CssBaseline } from "@mui/material"
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

// Light用のテーマ
const lightTheme = createTheme();

// Dark用のテーマ
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const IndexPage: React.FC<PageProps> = () => {
  const [text, setText] = React.useState<string>("")
  const [lang, setLang] = React.useState('zh-CN')
  const [toggle, setToggle] = React.useState(false)
  const [darkMode, setDarkMode] = React.useState(true);
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

  React.useEffect(() => {
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    if (!SpeechRecognition) {
      console.error("このブラウザはSpeechRecognitionをサポートしていません。");
      return;
    }

    let recognition: any;
    if (toggle) {      
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = lang;
      
      recognition.onresult = (event: any) => {
        const { transcript } = event.results[event.results.length - 1][0];
        setText(transcript);
      };
      
      recognition.onend = () => {
        recognition.start();
      };
      
      recognition.start();
    }

    return () => {
      if (recognition) {
        recognition.stop();
        recognition.onend = null; // イベントハンドラの解除
      }
    };
  }, [lang, toggle]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
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
                <MenuItem value={"zh-CN"}>简体中文</MenuItem>
                <MenuItem value={"zh-Hant-TW"}>繁體中文</MenuItem>
                <MenuItem value={"en-US"}>英文</MenuItem>
                <MenuItem value={"ja"}>日文</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <IconButton onClick={toggleDarkMode} aria-label="Toggle dark mode">
              {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Grid>
          <Grid item>
            <Button onClick={handleChangeToggle} variant="contained">
              {!toggle ? '開始' : '停止'}
            </Button>
          </Grid>
          <Grid item xs={12}>
            {text}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
