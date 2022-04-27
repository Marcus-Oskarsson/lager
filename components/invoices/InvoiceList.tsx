import { ScrollView, View, Text, TouchableOpacity, Button } from "react-native";
import { useState, useEffect } from "react";

import { Base, Typography } from "../../styles";
import invoiceModel from "../../models/invoice";
import Invoice from "../../interfaces/invoice";
import authModel from "../../models/auth";
import { DataTable } from "react-native-paper";

const InvoiceList = ({ route, navigation, setIsLoggedIn }) => {
  const [allInvoices, setAllInvoices] = useState<Partial<Invoice[]>>([]);
  let { reload } = route.params || false;

  const reloadInvocies = async () => {
    setAllInvoices(await invoiceModel.getInvoices());
  };

  if (reload) {
    reloadInvocies();
    route.params = false;
  }

  useEffect(() => {
    reloadInvocies();
  }, []);

  const table = allInvoices.map((invoice, index) => {
    return (
      <DataTable.Row key={index}>
        <DataTable.Cell>
          <Text style={{ ...Typography.normalTextColor, ...Typography.normal }}>
            {invoice.name}
          </Text>
        </DataTable.Cell>
        <DataTable.Cell>
          <Text style={{ ...Typography.normalTextColor, ...Typography.normal }}>
            {invoice.total_price}
          </Text>
        </DataTable.Cell>
        <DataTable.Cell>
          <Text style={{ ...Typography.normalTextColor, ...Typography.normal }}>
            {invoice.due_date}
          </Text>
        </DataTable.Cell>
      </DataTable.Row>
    );
  });

  return (
    <ScrollView style={Base.base}>
      <Text style={{ ...Typography.header2, ...Typography.header2color }}>
        Fakturor
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Form");
        }}
      >
        <View style={Base.button}>
          <Text style={{ ...Typography.normalTextColor, ...Typography.button }}>
            Skapa en Faktura
          </Text>
        </View>
      </TouchableOpacity>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>
            <Text
              style={{ ...Typography.normalTextColor, ...Typography.normal }}
            >
              Namn
            </Text>
          </DataTable.Title>
          <DataTable.Title>
            {" "}
            <Text
              style={{ ...Typography.normalTextColor, ...Typography.normal }}
            >
              Pris
            </Text>
          </DataTable.Title>
          <DataTable.Title>
            {" "}
            <Text
              style={{ ...Typography.normalTextColor, ...Typography.normal }}
            >
              Förfallodatum
            </Text>
          </DataTable.Title>
        </DataTable.Header>
        {table}
      </DataTable>
      <TouchableOpacity
        onPress={() => {
          authModel.logut();
          setIsLoggedIn(false);
        }}
      >
        <View style={Base.button}>
          <Text style={{ ...Typography.normalTextColor, ...Typography.button }}>
            Logga ut
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default InvoiceList;
