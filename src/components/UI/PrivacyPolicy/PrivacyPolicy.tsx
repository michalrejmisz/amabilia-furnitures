import {createStyles, useMantineTheme, Title, UnstyledButton} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group } from '@mantine/core';
import { ReactNode } from 'react';

const useStyles = createStyles((theme) => ({
    ol: {
        margin: "0 auto",
        textAlign: "left",
        fontWeight: 'bold',
        '& li.label': {
            fontWeight: 'normal',
        },
    },

    modal: {
        padding: "0",
    }
}));


const PrivacyPolicy = () => {
    const {classes} = useStyles();

    return(
        <div data-nosnippet>
            <Title order={1}>Polityka prywatności</Title>
            <ol className={classes.ol} type="I">
                <li>
                    Postanowienia ogólne
                    <ol>
                        <li className="label">
                            Polityka prywatności określa, jak zbierane, przetwarzane i przechowywane są dane osobowe Użytkowników niezbędne do świadczenia usług drogą elektroniczną za pośrednictwem serwisu internetowego www.amabilia-meble.pl (dalej: Serwis).
                        </li>
                        <li className="label">
                            Serwis zbiera wyłącznie dane osobowe niezbędne do świadczenia i rozwoju usług w nim oferowanych.
                        </li>
                        <li className="label">
                            Dane osobowe zbierane za pośrednictwem Serwisu są przetwarzane zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych, dalej RODO) oraz ustawą o ochronie danych osobowych z dnia 10 maja 2018 r.
                        </li>
                    </ol>
                </li>


                <li>
                    Administrator danych
                    <ol style={{listStyleType: "none"}}>
                        <li className="label">
                            Administratorem danych osobowych zbieranych poprzez Serwis jest Aleksandra Dolczewska , adres: Pokrzywno 4 w Poznaniu, KRS: 0000961122, NIP: 7822908278, REGON: 521500624, adres poczty elektronicznej: amabilia.poznan@gmail.com (dalej: Administrator).
                        </li>
                    </ol>
                </li>


                <li>
                    Cel zbierania danych osobowych
                    <ol>
                        <li className="label">
                            Dane osobowe wykorzystywane są w celu:
                            <ul>
                                <li className="label">rejestracji konta i weryfikacji tożsamości Użytkownika,</li>
                                <li className="label">Umożliwienia logowania do Serwisu,</li>
                                <li className="label">realizacji umowy dotyczącej usług i e-usług,</li>
                                <li className="label">komunikacji z Użytkownikiem (livechat, formularz kontaktowy itp.)</li>
                                <li className="label">wysyłki newslettera (po wyrażeniu zgody Użytkownika na jego otrzymywanie),</li>
                                <li className="label">prowadzenia systemu komentarzy,</li>
                                <li className="label">świadczenia usług społecznościowych,</li>
                                <li className="label">promocji oferty Administratora,</li>
                                <li className="label">marketingu, remarketingu, afiliacji,</li>
                                <li className="label">personalizacji Serwisu dla Użytkowników,</li>
                                <li className="label">działań analitycznych i statystycznych,</li>
                                <li className="label">windykacji należności,</li>
                                <li className="label">ustalenia i dochodzenia roszczeń albo obrony przed nimi.</li>
                            </ul>
                        </li>
                        <li className="label">
                            Podanie danych jest dobrowolne, ale niezbędne do zawarcia umowy albo skorzystania z innych funkcjonalności Serwisu.
                        </li>
                    </ol>
                </li>


                <li>
                    Rodzaj przetwarzanych danych osobowych
                    <ol style={{listStyleType: "none"}}>
                        <li className="label">
                            Administrator może przetwarzać dane osobowe Użytkownika: imię i nazwisko, data urodzenia, adres zamieszkania, adres e-mail, numer telefonu, NIP.
                        </li>
                    </ol>
                </li>


                <li>
                    Okres przetwarzania danych osobowych
                    <ol style={{listStyleType: "none"}}>
                        <li className="label">
                            Dane osobowe Użytkowników będą przetwarzane przez okres:
                            <ul>
                                <li className="label">gdy podstawą przetwarzania danych jest wykonanie umowy – do momentu przedawnienia roszczeń po jej wykonaniu,</li>
                                <li className="label">gdy podstawą przetwarzania danych jest zgoda – do momentu jej odwołania, a po odwołaniu zgody do przedawnienia roszczeń.</li>
                            </ul>
                        </li>
                        <li className="label">
                            W obu przypadkach termin przedawnienia wynosi 6 lat, a dla roszczeń o świadczenia okresowe i roszczeń dotyczących prowadzenia działalności gospodarczej – 3 lata (jeśli przepis szczególny nie stanowi inaczej).
                        </li>
                    </ol>
                </li>

                <li>
                    Udostępnianie danych osobowych
                    <ol>
                        <li className="label">
                            Dane osobowe Użytkowników mogą być przekazywane: podmiotom powiązanym z Administratorem, jego podwykonawcom, podmiotom współpracującym z Administratorem np. firmom obsługującym e-płatności, firmom świadczącym usługi kurierskie/pocztowe, kancelariom prawnym.
                        </li>
                        <li className="label">
                            Dane osobowe Użytkowników nie będą przekazywane poza teren Europejskiego Obszaru Gospodarczego (EOG).
                        </li>
                    </ol>
                </li>

                <li>
                    Prawa Użytkowników
                    <ol>
                        <li className="label">
                            Użytkownik Serwisu ma prawo do: dostępu do treści swoich danych osobowych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia, wniesienia sprzeciwu wobec przetwarzania, cofnięcia zgody w każdej chwili (co nie ma wpływu na zgodność z prawem przetwarzania dokonanego w oparciu o zgodę przed jej cofnięciem).
                        </li>
                        <li className="label">
                            Zgłoszenie o wystąpieniu przez Użytkownika z uprawnieniem wynikającym z wymienionych praw należy przesłać na adres amabilia.poznan@gmail.com.
                        </li>
                        <li className="label">
                            Administrator spełnia lub odmawia spełnienia żądania niezwłocznie – maksymalnie w ciągu miesiąca od jego otrzymania.
                        </li>
                        <li className="label">
                            Użytkownik ma prawo złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych, jeśli uzna, że przetwarzanie narusza jego prawa i wolności (RODO).
                        </li>
                    </ol>
                </li>


                <li>
                    Pliki cookies
                    <ol>
                        <li className="label">
                            Serwis zbiera informacje za pomocą plików cookies – sesyjnych, stałych i podmiotów zewnętrznych.
                        </li>
                        <li className="label">
                            Zbieranie plików cookies wspiera poprawne świadczenie usług w Serwisie i służy celom statystycznym.
                        </li>
                        <li className="label">
                            Użytkownik może określić zakres dostępu plików cookies do swojego urządzenia w ustawieniach przeglądarki.
                        </li>
                    </ol>
                </li>

                <li>
                    Zautomatyzowane podejmowanie decyzji i profilowanie
                    <ol>
                        <li className="label">
                            Dane Użytkowników nie mogą być przetwarzane w zautomatyzowany sposób tak, że na skutek tego mogłyby zapaść wobec nich jakiekolwiek decyzje.
                        </li>
                        <li className="label">
                            Dane Użytkowników mogą być profilowane celem dostosowania treści i personalizacji oferty po wyrażeniu przez nich zgody.
                        </li>
                    </ol>
                </li>

                <li>
                    Postanowienia końcowe
                    <ol>
                        <li className="label">
                            Administrator ma prawo do wprowadzenia zmian w Polityce prywatności, przy czym prawa Użytkowników nie zostaną ograniczone.
                        </li>
                        <li className="label">
                            Informacja o wprowadzonych zmianach pojawi się w formie komunikatu dostępnego w Serwisie.
                        </li>
                        <li className="label">
                            W sprawach nieuregulowanych w niniejszej Polityce prywatności obowiązują przepisy RODO i przepisy prawa polskiego.
                        </li>
                    </ol>
                </li>

            </ol>
        </div>
    )
}

export const PrivacyPolicyModal = ({ children }: { children: React.ReactNode }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const theme = useMantineTheme();
    const { classes } = useStyles();

    return(
        <>
            <Modal
                className={classes.modal}
                opened={opened}
                onClose={close}
                size="auto"
                styles={{
                    header: {
                        padding: "0",
                        margin: "0",
                        // backgroundColor: theme.colors.blue[6],
                        // paddingLeft: theme.spacing.md,
                        // paddingRight: theme.spacing.md,
                    },

                    body: {
                        margin: "0",
                        maxWidth: "900px",
                        width: "90vw",
                        padding: "20px",
                        paddingBottom: "40px",
                    },

                    modal: {
                        padding: "0",
                    },

                    root: {
                        padding: 0,
                    },
                }}
            >
                <PrivacyPolicy/>
            </Modal>

            <Group position="center">
                <UnstyledButton onClick={open}>{children}</UnstyledButton>
            </Group>
        </>
    )
}