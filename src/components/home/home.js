import React from "react";
import { useTranslation } from "react-i18next";
// import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { SAMPLE_DATA } from "../utils/service-helpers";

const useStyles = makeStyles((theme) => ({
  homePage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: (media480) => (media480 ? 26 : 36),
    marginBottom: 10,
    flexDirection: (media480) => (media480 ? "column" : "row"),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 260,
  },
  btnSubmit: {
    fontSize: 18,
    marginTop: 10,
    marginLeft: 10,
  },
  selectControl: {
    fontSize: 20,
  },
  subjectContent: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  listItem: {
    fontSize: 16,
    marginLeft: -20,
  },
  linkItem: {
    textDecoration: "none",
  },
}));

const Home = () => {
  const { t } = useTranslation();
  const media480 = useMediaQuery("(max-width:480px)");

  const [choosenClass, setClass] = React.useState(10);
  const [subject, setSubject] = React.useState("maths");
  const [content, setContent] = React.useState(null);

  const handleClassChange = (event) => {
    setClass(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  // Sort and make sure data available here using useMemo
  // TODO: Need to read from the API or use the static data for now
  const onBtnSubmitClick = async () => {
    // const data = await axios.get(AWS_API_V1, {headers: {"Access-Control-Allow-Origin": "*"}})
    // console.log('data', await data)
    const data = SAMPLE_DATA[choosenClass]["kannada"][subject];
    setContent(data);
  };

  const classes = useStyles(media480);

  return (
    <div>
      <div className={classes.homePage}>
        <FormControl className={classes.formControl}>
          <InputLabel id="class-label">{t("home-page.class")}</InputLabel>
          <Select
            labelId="class-label"
            value={choosenClass}
            onChange={handleClassChange}
            label={t("home-page.class")}
            className={classes.selectControl}
          >
            <MenuItem value={5}>{t("home-page.five")}</MenuItem>
            <MenuItem value={6}>{t("home-page.six")}</MenuItem>
            <MenuItem value={7}>{t("home-page.seven")}</MenuItem>
            <MenuItem value={8}>{t("home-page.eight")}</MenuItem>
            <MenuItem value={9}>{t("home-page.nine")}</MenuItem>
            <MenuItem value={10}>{t("home-page.ten")}</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="subject-label">{t("home-page.subject")}</InputLabel>
          <Select
            labelId="subject-label"
            value={subject}
            onChange={handleSubjectChange}
            label={t("home-page.subject")}
            className={classes.selectControl}
          >
            <MenuItem value={"kannada"}>{t("home-page.kannada")}</MenuItem>
            <MenuItem value={"english"}>{t("home-page.english")}</MenuItem>
            <MenuItem value={"hindi"}>{t("home-page.hindi")}</MenuItem>
            <MenuItem value={"maths"}>{t("home-page.maths")}</MenuItem>
            <MenuItem value={"science"}>{t("home-page.science")}</MenuItem>
            <MenuItem value={"social"}>{t("home-page.social")}</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          className={classes.btnSubmit}
          onClick={onBtnSubmitClick}
        >
          {t("home-page.submit-button")}
        </Button>
      </div>
      {content && (
        <div className={classes.subjectContent}>
          <div>
            {content
              .sort((a, b) => a.id - b.id)
              .map((data) => (
                <div key={data.id}>
                  <h2>
                    {`${t("home-page.chapter")}-${data.id}: `}
                    {data.title.kannada}
                  </h2>
                  {data.urls
                    .sort((a, b) => a.id - b.id)
                    .map((link) => (
                      <ul key={link.id}>
                        <li className={classes.listItem}>
                          <a className={classes.linkItem} href={link.url}>{`${t(
                            "home-page.part"
                          )}-${link.id}`}</a>
                        </li>
                      </ul>
                    ))}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
