49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
import { Tabs, router } from "expo-router";
          borderBottomColor: colors.border || '#e5e7eb',
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
          color: '#059669', // Soft emerald green for harmony with nutrition theme
        },
        headerRight: () => <SettingsButton />,
        tabBarStyle: {
          backgroundColor: colors.surface || '#fff',
          borderTopWidth: 1,
          borderTopColor: colors.border || '#e5e7eb',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Inicio",
          headerTitle: "Nutrireto",
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menú",
          headerTitle: "Menú del Día",
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="plans"
        options={{
          title: "Planes",
          headerTitle: "Planes Premium",
          tabBarIcon: ({ color, size }) => <Crown size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "Historial",
          headerTitle: "Mi Historial",
          tabBarIcon: ({ color, size }) => <History size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          headerTitle: "Mi Perfil",
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  settingsButton: {
    marginRight: 16,
    padding: 8,
    borderRadius: 20,
    backgroundColor: Platform.OS === 'web' ? 'rgba(0,0,0,0.05)' : 'transparent',
  },
  animatedIcon: {
    // Empty style for animated view
  },
});
