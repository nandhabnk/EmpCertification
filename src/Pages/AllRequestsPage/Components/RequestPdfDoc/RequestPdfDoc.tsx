import { Page, Text, Document, StyleSheet, Font } from "@react-pdf/renderer";

import { RequestData } from "../../../../shared/types/requestDetails";

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
  },

  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Oswald",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
});

const RequestPdfDoc = ({ currentRequest }: { currentRequest: RequestData }) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.title}>Zalex Inc. Employee Certificate</Text>
      <Text style={styles.subtitle}>
        Reference No: {currentRequest.reference_no}
      </Text>
      <Text style={styles.subtitle}>Issued on: {currentRequest.issued_on}</Text>
      <Text style={styles.subtitle}>To, {currentRequest.address_to}</Text>
      <Text style={styles.text}>
        This is to inform that the employee has been issued the certificate as
        of {currentRequest.issued_on}.
      </Text>
      <Text style={styles.text}>Purpose - {currentRequest.purpose}</Text>
      <Text style={styles.text}>
        For further queries, please contact HR at hr@zalexinc.com.
      </Text>
      <Text style={styles.subtitle}>For Zalex Inc.</Text>
      <Text style={styles.subtitle}>HR Team</Text>
    </Page>
  </Document>
);

export default RequestPdfDoc;
