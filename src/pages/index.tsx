import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Box, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Switch } from "@mui/material"

const IndexPage: React.FC<PageProps> = () => {
  const [text, setText] = React.useState<string>()
  const [lang, setLang] = React.useState('zh-Hant-TW')
  const [toggle, setToggle] = React.useState(false)

  const handleChangeLang = (event: SelectChangeEvent) => {
    setLang(event.target.value as string);
  };

  const handleChangeToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToggle(event.target.checked);
  };

  React.useEffect(() => {
    if (!toggle) return;
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang; 

    recognition.onresult = (event: any) => {
      const { transcript } = event.results[event.results.length - 1][0];
      setText(transcript);
    };

    recognition.start();

    return () => {
      recognition.stop(); 
    };
  }, [lang, toggle]);

  return (
    <>
      <Container maxWidth="sm">
        <br />
        <Box sx={{ m: 1, minWidth: 120 }}>
          <FormControl size="small">
            <InputLabel id="demo-simple-select-label">語言</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={lang}
              label="Language"
              onChange={handleChangeLang}
            >
              <MenuItem value={"zh-Hant-TW"}>繁體中文</MenuItem>
              <MenuItem value={"en-US"}>英文</MenuItem>
              <MenuItem value={"ja"}>日文</MenuItem>
            </Select>
          </FormControl>

          <Switch
            checked={toggle}
            onChange={handleChangeToggle}
            inputProps={{ 'aria-label': 'controlled' }}
          />          
        </Box>
        <br />

        {text}
      </Container>
    </>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
